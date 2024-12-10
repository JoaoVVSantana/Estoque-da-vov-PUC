import {
  DataTypes,
  alerta,
  loteDeItens,
} from './../../packages.js';
import database from '../../db/database.js';
const item = database.define('item', {
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validade: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_doador: {
    type:DataTypes.INTEGER,
    references:{
      key:"id_doador",
      model:'doadores'
    },
    allowNull:true,
  },
  id_lote: {
    type:DataTypes.INTEGER,
    references:{
      key:"id_lote",
      model:'loteDeItens'
    },
    allowNull:true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  }

},
{
  tableName: 'itens',
  timestamps: false,
});

// #region relacionamentos

// #endregion

// #region Métodos
item.todosItensPertoDoVencimento = async function  () { 

  const itens = await item.findAll();
  let listaAlertas = new Array();
  for (const item of itens) {
     const diasParaVencimento = (new Date(item.validade) - new Date()) / (1000 * 60 * 60 * 24);
     
    if (item.tipo=='Medicamento' && diasParaVencimento < 30) {
      const alertaMedicamento = await alerta.criarAlerta(item,'Vencimento de medicamento',`O medicamento ${item.nome} vence em 30 dias, verificar no estoque. ` );

    listaAlertas.push(alertaMedicamento);
    }
    else if (item.tipo=='Perecivel' && diasParaVencimento < 2) {
      const alertaPerecivel = await alerta.criarAlerta(item,'Vencimento de perecível',`O alimento perecível ${item.nome} vence em 2 dias, verificar no estoque. ` );
      listaAlertas.push(alertaPerecivel);
    }
    else if (item.tipo=='Nao Perecivel' && diasParaVencimento < 5) {
      const alertaNPerecivel = await alerta.criarAlerta(item,'Vencimento de não perecível',`O alimento não perecível ${item.nome} vence em 5 dias, verificar no estoque. ` );
      listaAlertas.push(alertaNPerecivel);
    }
    else if (diasParaVencimento < 0) {
      const alertaVencido = await alerta.criarAlerta(item,'A validade do item está vencida! ',` ${item.nome} de ID: ${item.id_item}, validade:${item.validade}  deve ser identificado e descartado imediatamente! ` );
      listaAlertas.push(alertaVencido);
    }

  }
  return listaAlertas;
};

item.itensVencidos = async function  () { 

  const itens = await item.findAll();
  let itensVencidos = new Array();
  for (const item of itens) {
     const diasParaVencimento = (new Date(item.validade) - new Date()) / (1000 * 60 * 60 * 24);
     
    if (diasParaVencimento < 0) {

      itensVencidos.push(item);
    }
   
  }
  return itensVencidos;
};

/*
// Alterar aqui para lote
item.todosItensEmBaixaQuantidade = async function () {
  // Busca todos os itens
  const itens = await item.findAll();
  const itensEmBaixa = await Promise.all(
    itens.map(async item => ({
      nome: item.nome,
      estaEmBaixa: await this.verificaSeEstaEmBaixaQuantidade(item.nome),
    }))
  );
  const itensUnicos = [];
  const nomesRepetidos = new Set(); //isso é pra n adicionar o mesmo item mais de uma vez

  for (const item of itensEmBaixa) {
    if (item.estaEmBaixa && !nomesRepetidos.has(item.nome)) {
      itensUnicos.push(item);
      nomesRepetidos.add(item.nome);
    }
  }

  return itensUnicos;
};
*/


//ALTERA OS DADOS DE UM ITEM ESPECIFICO ATRAVÉS DE SEU ID
item.atualizarItem = async function (id_item, novosDados) {
  try {
    const itemA = await item.findByPk(id_item);

    if (!itemA) {
      throw new Error(`Item com ID ${id_item} não encontrado.`);
    }
   
    if (!novosDados.nome || !novosDados.validade || !novosDados.tipo) {
      throw new Error('Os campos nome, validade e tipo são obrigatórios.');
    }

    // Atualiza os campos do item com os novos dados
    await itemA.update(novosDados);

    return itemA; // Retorna o item atualizado
  } catch (error) {
    throw new Error('Erro ao atualizar o item: ' + error.message);
  }
};

/*
// Alterar aqui para lote
item.verificaSeEstaEmBaixaQuantidade = async function (nomeDoItem)  {
  const itensVerificados = await this.contaQuantosItensExistemPeloNome(nomeDoItem); //Busca em todos os itens pelo nome
  
  return itensVerificados < 5;
  
};
*/

/*
// Alterar aqui para lote
item.contaQuantosItensExistemPeloNome = async function  (nomeDoItem) {
  const totalDeItens = await item.count({ where: { nome: nomeDoItem } });
  return totalDeItens;
};
*/



item.retornaTodosItensComAqueleNome = async function  (nomeDoItem) {
  const listaDeItens = await item.findAll({where: {nome: nomeDoItem} });
  return listaDeItens;
};

item.buscarItensDoacao = async function () {
  try {
    const itens = await item.findAll();
    const itensDoados = itens.filter(item => item.id_doador !== null);
    
    return itensDoados;
  } catch (error) {
    throw new Error('Erro ao buscar os itens de doacao: ' + error.message);
  }
};

// #endregion


// #region Lote de Itens


// Verifica os itens em baixa
item.todosItensEmBaixaQuantidade = async function () {
  // Busca todos os itens
  const itens = await item.findAll();
  const itensEmBaixa = await Promise.all(
    itens.map(async item => ({
      estaEmBaixa: await this.verificaSeEstaEmBaixaQuantidade(item),
    }))
  );
  const itensUnicos = [];
  const nomesRepetidos = new Set(); //isso é pra n adicionar o mesmo item mais de uma vez

  for (const item of itensEmBaixa) {
    if (item.estaEmBaixa && !nomesRepetidos.has(item.nome)) {
      itensUnicos.push(item);
      nomesRepetidos.add(item.nome);
    }
  }

  return itensUnicos;
};

// Verificar se o lote possui menos do que 5 itens
item.verificaSeEstaEmBaixaQuantidade = async function (item)  {
  const itensVerificados = await this.contaQuantosItensExistemPeloLote(item); //Busca em todos os lotes pelo nome
  
  return itensVerificados < 5;
  
};

// Verifica quantos itens existem no respectivo lote
item.contaQuantosItensExistemPeloLote = async function (itemA) {
  const loteDoItem = await loteDeItens.findByPk(itemA.id_lote);
  return loteDoItem.quantidade;
};


// #endregion

export default  item;

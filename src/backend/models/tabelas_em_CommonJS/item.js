const { DataTypes } = require('../../packages.js');
const database = require('../../db/database.js');

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
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_lote: {
    type: DataTypes.INTEGER,
    references: {
      key:"id_lote",
      model:'loteDeItens'
    },
    allowNull: false,
  },
  id_doador: {
    type: DataTypes.INTEGER,
    references: {
      model: 'doadores',
      key: 'id_doador',
    },
    allowNull: true,
  },
}, {
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
    else if (item.tipo=='Não Perecivel' && diasParaVencimento < 5) {
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


// LISTA TODOS ITENS DO ESTOQUE
item.buscarTodosItens = async function () {
  try {
    const itens = await item.findAll(); // Busca todos os itens na tabela
    return itens;
  } catch (error) {
    throw new Error('Erro ao buscar todos os itens: ' + error.message);
  }
};


//ALTERA OS DADOS DE UM ITEM ESPECIFICO ATRAVÉS DE SEU ID
item.atualizarItem = async function (id_item, novosDados) {
  try {
    const itemA = await item.findByPk(id_item);

    if (!itemA) {
      throw new Error(`Item com ID ${id_item} não encontrado.`);
    }
    //Verifica se estão preenchidos
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



item.verificaSeEstaEmBaixaQuantidade = async function (nomeDoItem)  {
  const itensVerificados = await this.contaQuantosItensExistemPeloNome(nomeDoItem); //Busca em todos os itens pelo nome
  
  return itensVerificados < 5;
  
};

item.contaQuantosItensExistemPeloNome = async function  (nomeDoItem) {
  const totalDeItens = await item.count({ where: { nome: nomeDoItem } });

  return totalDeItens;
};

item.retornaTodosItensComAqueleNome = async function  (nomeDoItem) {
  const listaDeItens = await item.findAll({where: {nome: nomeDoItem} });
  return listaDeItens;
};

// ATENÇÃO VERIFIQUE SE ESTA CORRETO A IMPLEMENTAÇÃO, MAS ESTA FUNCIONANDO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// LISTA TODOS ITENS DO ESTOQUE
item.buscarItensDoacao = async function () {
  try {
    const itens = await item.buscarTodosItens(); // Busca todos os itens no bd
    const itensDoados = itens.filter(item => item.id_doador !== null);
    
    return itensDoados;
  } catch (error) {
    throw new Error('Erro ao buscar os itens de doacao: ' + error.message);
  }
};

item.verificaSeExisteItem= async function (itemA) {
 
  return itemA ? true : false;
};
// #endregion

module.exports = item;

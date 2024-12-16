import {
  DataTypes,
  alerta,
  loteDeItens,
} from './../../packages.js';
import database from '../../db/database.js';
import formatarData from '../utils/formatarData.js';
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
    type: DataTypes.DATEONLY,
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
    allowNull:false,
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
item.todosItensPertoDoVencimento = async function () {
  try {
    const itens = await item.findAll();

    const listaAlertas = await Promise.all(
      itens.map(async (item) => {   
        const diasParaVencimento = Math.floor(
          (new Date(item.validade).setHours(23, 59, 59, 999) - new Date()) / (1000 * 60 * 60 * 24)
        );

        if (diasParaVencimento < 5 && diasParaVencimento > 0) {
          const dataFormatada = await formatarData(item.validade);
          return await alerta.criarAlerta(
            item,
            "Alerta de vencimento",
            `O item ${item.nome} vence em: ${dataFormatada}`
          );
        }
      })
    );

    return listaAlertas.filter(Boolean); // Remove alertas inválidos
  } catch (error) {
    console.error("Erro ao criar Alertas:", error.message);
    throw new Error("Erro ao processar alertas.");
  }
};

item.itensVencidos = async function  () { 

  const todosItens = await item.findAll();
    const listaVencidos = await Promise.all(
      todosItens.map(async (item) => {   
        const diasParaVencimento = Math.floor(
          (new Date(item.validade).setHours(23, 59, 59, 999) - new Date()) / (1000 * 60 * 60 * 24)
        );
        if (diasParaVencimento <= 0 ) {
          const dataFormatada = await formatarData(item.validade); // no utils
          return await alerta.criarAlerta(
            item,
            "Alerta de vencimento",
            `O item ${item.nome} VENCEU em: ${dataFormatada}, DEVE SER DESCARTADO! `
          );
        }
      })
    );

    return listaVencidos.filter(Boolean); // > remover alertas invalidos
  
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

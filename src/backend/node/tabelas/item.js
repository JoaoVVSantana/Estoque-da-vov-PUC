import {
  DataTypes,
  alerta,
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
  tipo: {
    type: DataTypes.STRING, // Antigo ENUM, testar se dá pra fazer assim
    allowNull: false,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
   
    allowNull: false,
  },
  id_doacao: {
    type:DataTypes.INTEGER,
    allowNull:true,
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
     
    if (item.tipo=='medicamento' && diasParaVencimento < 30) {
      const alertaMedicamento = await alerta.criarAlerta(item,'Vencimento de medicamento',`O medicamento ${item.nome} vence em 30 dias, verificar no estoque. ` );

    listaAlertas.add(alertaMedicamento);
    }
    else if (item.tipo=='Alimento Perecível' && diasParaVencimento < 10) {
      const alertaPerecivel = await alerta.criarAlerta(item,'Vencimento de perecível',`O alimento perecível ${item.nome} vence em 10 dias, verificar no estoque. ` );
      listaAlertas.add(alertaPerecivel);
    }
    else if (item.tipo=='Alimento não Perecível' && diasParaVencimento < 15) {
      const alertaNPerecivel = await alerta.criarAlerta(item,'Vencimento de não perecível',`O alimento não perecível ${item.nome} vence em 15 dias, verificar no estoque. ` );
      listaAlertas.add(alertaNPerecivel);
    }
  }
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

// ATENÇÃO VERIFIQUE SE ESTA CORRETO A IMPLEMENTAÇÃO, MAS ESTA FUNCIONANDO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// LISTA TODOS ITENS DO ESTOQUE
item.buscarTodosItens = async function () {
  try {
    const itens = await item.findAll(); // Busca todos os itens na tabela
    return itens;
  } catch (error) {
    throw new Error('Erro ao buscar todos os itens: ' + error.message);
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


item.verificaSeExisteItem= async function (itemA) {
 
  return itemA ? true : false;
};
// #endregion

export default  item;

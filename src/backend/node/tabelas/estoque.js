import {
  DataTypes,
  alteracao,
  item,
  loteDeItens
} from './../../packages.js';

import database from '../../db/database.js';

const estoque = database.define('estoque', {
  id_estoque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  armazenamento_disponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidadeItens: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  quantidadeAlertas: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  id_gerente: { 
    type: DataTypes.INTEGER,
    references:{
      model:"gerente",
      key:"id_gerente"
    },
    allowNull: false,
  },

}, {
  tableName: 'estoque',
  timestamps: false,
});

// #region relacionamentos


// #endregion

// #region Estoque


estoque.verificaSeEPossivelInserirItem = async function () {
  const estoqueA = await estoque.findByPk(1);

  if (!estoqueA) {
    throw new Error(`Estoque não encontrado.`);
  }
  return !estoqueA.armazenamento_disponivel > estoqueA.quantidadeItens;
};

estoque.criarEstoqueNoBanco = async function (armazenamento) {
  const novoEstoque = await estoque.create({
    armazenamento_disponivel:armazenamento,
    id_gerente:1
  })

  return novoEstoque;
}

estoque.itemFoiRetirado = async function (estoqueA, transaction) {
  
  // Atualiza o armazenamento disponível e a quantidade de itens
  try {
  
    estoqueA.armazenamento_disponivel -= 1;
    estoqueA.quantidadeItens -= 1;
    await estoqueA.save({ transaction });
  
  } catch (error) {
    throw error;
  }
};


estoque.itemFoiInserido = async function (estoqueA, quantidade, transaction) {
  try {
    
    estoqueA.armazenamento_disponivel -= 1; 
    estoqueA.quantidadeItens += parseInt(quantidade);

    await estoqueA.save({ transaction });
  } catch (error) {
    throw new Error('Erro ao atualizar o estoque: ' + error.message);
  }
}; 


// #endregion

export default  estoque;
const { DataTypes } = require('../../packages.js');
const database = require('../../db/database.js');

const alteracao = database.define('alteracao', {
  id_alteracao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_alteracao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'saída'),
    allowNull: false,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: 'estoque',
      key: 'id_estoque',
    },
    allowNull: false,
  },
  gerenteResponsavel: {
    type: DataTypes.INTEGER,
    references: {
      model: 'gerente',
      key: 'id_gerente',
    },
    allowNull: false,
  },
  itemAlterado: {
    type: DataTypes.INTEGER,
    references: {
      model: 'item',
      key: 'id_item',
    },
    allowNull: false,
  }
}, {
  tableName: 'alteracoes',
  timestamps: false,
});

alteracao.criarInsercaoDeItem = async function (itemA, estoqueA, transaction) {
  try {
    await alteracao.create({
      descricao: `Inserção do item ${itemA.nome}`,
      data_alteracao: new Date(),
      tipo: 'entrada',
      id_estoque: estoqueA.id_estoque,
      id_item: itemA.id_item,
      id_historico: estoqueA.id_historico,
      id_gerente: 1,
    }, { transaction });
  } catch (error) {
    throw new Error('Erro ao registrar a alteração: ' + error.message);
  }
};

alteracao.criarRetiradaDeItem = async function (itemA, estoqueA, transaction) {
  try {
    await alteracao.create({
      descricao: `Retirada do item ${itemA.nome}`,
      data_alteracao: new Date(),
      tipo: 'saída',
      id_estoque: estoqueA.id_estoque,
      id_item: itemA.id_item,
      id_historico: estoqueA.id_historico,
      id_gerente: 1,
    }, { transaction });
  } catch (error) {
    throw new Error('Erro ao registrar a alteração: ' + error.message);
  }
};

module.exports = alteracao;

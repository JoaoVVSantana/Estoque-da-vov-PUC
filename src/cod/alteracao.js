const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const estoque = require('./estoque');
const gerente = require('./gerente');

const alteracao = sequelize.define('alteracao', {
  id_alteracao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
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
      model: estoque,
      key: 'id_estoque',
    },
    allowNull: false,
  },
  id_gerente: {
    type: DataTypes.INTEGER,
    references: {
      model: gerente,
      key: 'id_gerente',
    },
    allowNull: true,
  },
}, {
  tableName: 'alteracoes',
  timestamps: false,
});

// #region relacionamentos
alteracao.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });
alteracao.belongsTo(gerente, { foreignKey: 'id_gerente', as: 'gerente' });
// #endregion

// #region Métodos

// #endregion
module.exports = alteracao;

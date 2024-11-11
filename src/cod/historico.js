const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const estoque = require('./estoque');
const alteracao = require('./alteracao');

const historico = sequelize.define('historico', {
  id_historico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_alteracao: {
    type: DataTypes.INTEGER,
    references: {
      model: alteracao,
      key: 'id_alteracao',
    },
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
}, {
  tableName: 'historico_alteracoes',
  timestamps: false,
});

// #region relacionamentos
historico.belongsTo(alteracao, { foreignKey: 'id_alteracao', as: 'alteracao' });
historico.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });
// #endregion

// #region Métodos

// #endregion
module.exports = historico;


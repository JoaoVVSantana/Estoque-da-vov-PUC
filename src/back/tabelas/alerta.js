const { DataTypes } = require('sequelize');
const sequelize = require('./db/database');
const item = require('./item');
const estoque = require('./estoque');
const gerente = require('./gerente');

const alerta = sequelize.define('alerta', {
  id_alerta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_item: {
    type: DataTypes.INTEGER,
    references: {
      model: item,
      key: 'id_item',
    },
    allowNull: true,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: estoque,
      key: 'id_estoque',
    },
    allowNull: true,
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
  tableName: 'alertas',
  timestamps: false,
});

// #region relacionamentos
alerta.belongsTo(item, { foreignKey: 'id_item', as: 'item' });
alerta.belongsTo(gerente, { foreignKey: 'id_gerente', as: 'gerente' });
// #endregion

// #region Métodos
alerta.prototype.dispararParaGerente = async function () {
  
}
// #endregion
module.exports = alerta;


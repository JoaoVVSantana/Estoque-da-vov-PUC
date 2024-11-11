const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const estoque = require('./estoque');
const alerta = require('./alerta');
const alteracao = require('./alteracao');

const gerente = sequelize.define('gerente', {
  id_gerente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'gerentes',
  timestamps: false,
});

// #region relacionamentos
gerente.hasOne(estoque, { foreignKey: 'id_gerente', as: 'estoque' });
gerente.hasMany(alerta, { foreignKey: 'id_gerente', as: 'alertas' });
gerente.hasMany(alteracao, { foreignKey: 'id_gerente', as: 'alteracoes' });
// #endregion
module.exports = gerente;

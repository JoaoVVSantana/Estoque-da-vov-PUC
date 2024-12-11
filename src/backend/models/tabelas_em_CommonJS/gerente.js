const { DataTypes } = require('../../packages.js');
const database = require('../../db/database.js');

const gerente = database.define('gerente', {
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
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: 'estoque',
      key: 'id_estoque',
    },
    allowNull: false,
  },
}, {
  tableName: 'gerente',
  timestamps: false,
});



// #region relacionamentos

// #endregion

// #region Métodos


// #endregion

module.exports = gerente;
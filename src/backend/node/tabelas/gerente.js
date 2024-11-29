import {
  DataTypes,
} from './../../packages.js';
import database from '../../db/database.js';
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
  id_estoque:{
    type:DataTypes.INTEGER,
    references:{
      model: 'estoque',
      key: 'id_estoque',
    },
    allowNull:false,
  },
  alertas:{
    type:DataTypes.INTEGER,
    references:{
      model: 'alerta',
      key: 'id_alerta',
    },
    allowNull:false,
  }
}, {
  tableName: 'gerente',
  timestamps: false,
});

// #region relacionamentos

// #endregion

// #region Métodos


// #endregion
export default gerente;

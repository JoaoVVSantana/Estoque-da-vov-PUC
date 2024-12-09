
import { DataTypes } from 'sequelize';
import database from '../../db/database.js';

//É uma lista de cada item, como se fosse a coleção de itens do mesmo tipo
//configurar na próxima sprint
const loteDeItens = database.define('loteDeItens', {
  id_lote:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: 'estoque',
      key: 'id_estoque',
    },
    primaryKey: true,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  tableName: 'lotesDeItens',
  timestamps: false,
});


export default loteDeItens;

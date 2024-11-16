import{
item,
estoque,
} from './relacionamentos.js';
import { DataTypes } from 'sequelize';
import database from '../../../db/database.js';
//É uma lista de cada item, como se fosse a coleção de itens do mesmo tipo
const loteDeItens = database.define('EstoqueItem', {
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: 'estoque',
      key: 'id_estoque',
    },
    primaryKey: true,
  },
  id_item: {
    type: DataTypes.INTEGER,
    references: {
      model: 'itens',
      key: 'id_item',
    },
    primaryKey: true,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'estoque_itens',
  timestamps: false,
});
loteDeItens.hasMany(item,{foreignkey:'id_item', as:'itens'});
loteDeItens.belongsTo(estoque,{foreignkey:'id_etoque',as:'estoque'});
module.exports = loteDeItens;

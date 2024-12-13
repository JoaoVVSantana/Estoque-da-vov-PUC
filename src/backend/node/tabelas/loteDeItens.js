
import { DataTypes } from 'sequelize';
import database from '../../db/database.js';
import {estoque,item} from '../../packages.js';

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
    allowNull:false
  },
  nome:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'lotesDeItens',
  timestamps: false,
});

loteDeItens.adicionarItens= async function(nome,validade,tipo, id_doador, id_lote,quantidade)
{
  try {
    for (let i = 1; i <= quantidade; i++) {
      await estoque.inserirItem(nome,validade,tipo, id_doador, id_lote, transaction);
    } 
    // Commit da transação
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
  
}

loteDeItens.retirarItens= async function(id_lote,quantidade)
{
  const transaction = await database.transaction();
  try {
    const itensDoLote = await item.findAll({where:{id_lote:id_lote}})
    const quantidadeNoLote = await itensDoLote.count();
    if(quantidadeNoLote < quantidade){ throw new Error ('O Lote possui menos itens que quantidade de itens que deseja retirar');}
    
    for (let i = 0; i <= quantidade; i++) {
      const itemA = itensDoLote[i];
      await estoque.retirarItem(itemA.id_item, transaction);
    } 
    // Commit da transação
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
  
}
export default loteDeItens;

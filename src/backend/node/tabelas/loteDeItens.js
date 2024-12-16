
import { DataTypes } from 'sequelize';
import database from '../../db/database.js';
import {estoque,item, alteracao} from '../../packages.js';
import { Op } from 'sequelize';

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

loteDeItens.adicionarUmItem = async function(nome,validade,tipo, id_doador, id_lote,transaction)
{ 
  
  try {
      const loteA = await loteDeItens.findByPk(id_lote);

      const novoItem = await loteDeItens.criarItem(nome,validade,tipo, id_doador, id_lote, transaction);
      
      await alteracao.criarInsercaoDeItem(novoItem, transaction);

      const quantidade=1;
      await loteDeItens.atualizarLoteInserir(loteA, quantidade, transaction);

      

      return novoItem;

  } catch (error) {
    throw error;
  }
  
}
loteDeItens.criarItem = async function (nome,validade,tipo, id_doador, id_lote, transaction) {
  

  try {
    
    const estoqueA = await loteDeItens.findByPk(1, { transaction });

    const novoItem = await item.create(
      {
        nome:nome,
        validade:validade,
        tipo:tipo,
        id_estoque:1,
        id_doador:id_doador,
        id_lote:id_lote
      },
      { transaction }
    );
    const quantidade =1; 
    await estoque.itemFoiInserido(estoqueA,quantidade, transaction);

    return novoItem;
  } catch (error) {
    throw error;
  }
};

loteDeItens.adicionarVariosItens = async function(nome,validade,tipo, id_doador, id_lote, quantidade, transaction)
{ 
  try {
 
    const itens = Array.from({ length: quantidade }, () => ({ // pega os dados e coloca em um array
      nome,
      validade,
      tipo,
      id_estoque: 1, 
      id_doador,
      id_lote
    }));

    const itensAdicionados = await item.bulkCreate(itens, { transaction }); // insere no sequelize pra criar de uma vez, se n demora mt

    const loteA = await loteDeItens.findByPk(id_lote, { transaction });
    
    await loteDeItens.atualizarLoteInserir(loteA, quantidade, transaction);
    
    const estoqueA = await loteDeItens.findByPk(1, { transaction });
    await estoque.itemFoiInserido(estoqueA,quantidade, transaction);

    await Promise.all(
      itensAdicionados.map(novoItem =>
        alteracao.criarInsercaoDeItem(novoItem, transaction)
      )
    );

    
    return itensAdicionados;

  } catch (error) {
    
    throw error;
  }
  
}

loteDeItens.retirarItem = async function(id_item,transaction)
{
  try {   
    const itemA = await item.findByPk(id_item, { transaction });

    const loteA = await loteDeItens.findByPk(itemA.id_lote, { transaction });
    

    await alteracao.criarRetiradaDeItem(itemA, transaction); 

    await loteDeItens.deletarItem(itemA, transaction);
    await loteDeItens.atualizarLoteRetirar(loteA, transaction);
    
  } catch (error) {
    throw error;
  }
  
}



loteDeItens.deletarItem = async function (itemA, transaction) {
  
  try {
    const estoqueA = await estoque.findByPk(1);
    
    if (!estoqueA|| !itemA ) {
      throw new Error(`Erro ao retirar: Item ou estoque  não encontrados`);
    }
    
    await estoque.itemFoiRetirado(estoqueA,transaction);
    await itemA.destroy({ transaction });

  } catch (error) {
    
    throw error;
  }
};

loteDeItens.atualizarLoteInserir = async function (loteA, quantidadeN, transaction) {
  try {
    const quantidadeAnterior = parseInt(loteA.quantidade);
   
    loteA.quantidade = quantidadeAnterior + parseInt(quantidadeN);
    
    await loteA.save({ transaction });
  } catch (error) {
    throw error;
  }
};
loteDeItens.atualizarLoteRetirar = async function (loteA, transaction) {
  try {
    const quantidadeAnterior = parseInt(loteA.quantidade);
    
    loteA.quantidade = quantidadeAnterior - 1;
   
    await loteA.save({ transaction });
  } catch (error) {
    throw error;
  }
};

loteDeItens.emBaixaQuantidade = async function () {
  
  return await loteDeItens.findAll({
    where: {
      quantidade: { [Op.between]: [1,4] }
    },
    order: [['quantidade', 'ASC']]
  });
};

loteDeItens.semItens = async function () {
  
  return await loteDeItens.findAll({
    where: {
      quantidade: { [Op.eq]: 0 }
    },
    order: [['id_lote', 'ASC']]
  });
};

export default loteDeItens;


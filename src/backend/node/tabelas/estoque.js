import {
  DataTypes,
  alteracao,
  item,
  loteDeItens
} from './../../packages.js';

import database from '../../db/database.js';

const estoque = database.define('estoque', {
  id_estoque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  armazenamento_disponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidadeItens: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  quantidadeAlertas: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  id_gerente: { 
    type: DataTypes.INTEGER,
    references:{
      model:"gerente",
      key:"id_gerente"
    },
    allowNull: false,
  },

}, {
  tableName: 'estoque',
  timestamps: false,
});

// #region relacionamentos


// #endregion

// #region Estoque


estoque.verificaSeEPossivelInserirItem = async function () {
  const estoqueA = await estoque.findByPk(1);

  if (!estoqueA) {
    throw new Error(`Estoque não encontrado.`);
  }
  return !estoqueA.armazenamento_disponivel > estoqueA.quantidadeItens;
};

estoque.criarEstoqueNoBanco = async function (armazenamento) {
  const novoEstoque = await estoque.create({
    armazenamento_disponivel:armazenamento,
    id_gerente:1
  })

  return novoEstoque;
}

estoque.retirarItem = async function (id_item, transaction) {
  

  try {
 
    const itemA = await item.findByPk(id_item);
    const estoqueA = await estoque.findByPk(1);
    const loteA = await loteDeItens.findByPk(itemA.id_lote);
    if (!estoqueA|| !itemA ||!loteA) {
      throw new Error(`Erro ao retirar: Item, estoque ou lote não encontrados`);
    }
    
    // Calcula o armazenamento liberado
    await estoque.itemFoiRetirado(itemA,estoqueA,loteA,transaction);

    await itemA.destroy({ transaction });

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
estoque.itemFoiRetirado = async function (itemA,estoqueA,loteA, transaction) {
  
  // Atualiza o armazenamento disponível e a quantidade de itens
  try {
   
    
    estoqueA.armazenamento_disponivel -= 1;
    estoqueA.quantidadeItens -= 1;

    loteA.quantidade-=1;
    await alteracao.criarRetiradaDeItem(itemA, estoqueA, transaction); 

   
    await loteA.save({ transaction });
    await estoqueA.save({ transaction });
  

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

estoque.inserirItem = async function (nome,validade,tipo, id_doador, id_lote, transaction) {
  

  try {
    
    const estoqueA = await estoque.findByPk(1);
    const loteA = await loteDeItens.findByPk(id_lote);
    // Verifica se o armazenamento disponível permite a inserção
    if (await estoque.verificaSeEPossivelInserirItem()) {
      throw new Error('Não há espaço disponível no estoque, apenas ',estoqueA.armazenamento_disponivel);
    }

    const novoItem = await item.create(
      {
        nome,
        validade,
        tipo,
        id_estoque:1,
        id_doador,
        id_lote
      },
      { transaction }
    );

    // Atualiza o estoque
    await estoque.itemFoiInserido(novoItem, estoqueA,loteA, transaction);
  
    // Commit da transação
    await transaction.commit();

    return novoItem;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
estoque.itemFoiInserido = async function (novoItem, estoqueA,loteA, transaction) {
  try {
    
    estoqueA.armazenamento_disponivel -= 1; 
    estoqueA.quantidadeItens += 1;

    if(!loteA) {
      throw new Error ('O Lote não existe')
    }    
    loteA.quantidadeItens += 1;
      
    // Cria um registro no histórico de alterações
    await alteracao.criarInsercaoDeItem(novoItem, estoqueA, transaction);

    await loteA.save({ transaction });
    await estoqueA.save({ transaction });
  } catch (error) {
    throw new Error('Erro ao atualizar o estoque: ' + error.message);
  }
}; 


// #endregion

export default  estoque;
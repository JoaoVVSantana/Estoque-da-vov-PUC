const { DataTypes } = require('../../packages.js');
const database = require('../../db/database.js');

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
    references: {
      model: 'gerente',
      key: 'id_gerente',
    },
    allowNull: false,
  },
}, {
  tableName: 'estoque',
  timestamps: false,
});



// #region relacionamentos


// #endregion

// #region Métodos



estoque.verificaSeEPossivelInserirItem = async function (id_estoque) {
  const estoqueA = await estoque.findByPk(id_estoque);

  // Verifica se o estoque foi encontrado
  if (!estoqueA) {
    throw new Error(`Estoque com ID ${id_estoque} não encontrado.`);
  }
  console.log(id_estoque,'<<<<<<<<<<<<<');
  console.log(estoqueA.quantidadeItens,'<<<<<<<<<<<<<');
  console.log(estoqueA.armazenamento_disponivel,'<<<<<<<<<<<<<');
  // Retorna se é possível inserir
  return !estoqueA.armazenamento_disponivel > estoqueA.quantidadeItens;
};
estoque.verificaSeEPossivelRetirarItem = async function (id_estoque) {
  const estoqueA = await estoque.findByPk(id_estoque);

  // Verifica se o estoque foi encontrado
  if (!estoqueA) {
    throw new Error(`Estoque com ID ${id_estoque} não encontrado.`);
  }

  // Retorna se é possível retirar
  return  estoqueA.quantidadeItens;
};



estoque.criarEstoqueNoBanco = async function (armazenamento) {
  const novoEstoque = await estoque.create({
    armazenamento_disponivel:armazenamento,
    id_gerente:1,
  })

  
  return novoEstoque;
}

estoque.verificaSeExisteEstoque= async function (estoqueA) {
  return estoqueA ? true : false;
};

estoque.retirarItem = async function (id_item, id_estoque) {
  const transaction = await database.transaction();

  try {
    // Encontra o item pelo ID
    const itemA = await item.findByPk(id_item);
    if (!itemA) {
      throw new Error(`Item com ID ${id_item} não encontrado.`);
    }

    // Encontra o estoque pelo ID
    const estoqueA = await estoque.findByPk(id_estoque);
    if (!estoqueA) {
      throw new Error(`Estoque com ID ${id_estoque} não encontrado.`);
    }

    
    // Calcula o armazenamento liberado
    await estoque.itemFoiRetirado(id_item,id_estoque,transaction);

    await itemA.destroy({ transaction });

    // Commit da transação
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};


estoque.itemFoiRetirado = async function (id_item, id_estoque, transaction) {
  
  // Atualiza o armazenamento disponível e a quantidade de itens
  try {
    const estoqueA = await estoque.findByPk(id_estoque);
    const itemA = await item.findByPk(id_item);
    
    estoqueA.armazenamento_disponivel -= 1;
    estoqueA.quantidadeItens -= 1;

    await alteracao.criarRetiradaDeItem(itemA, estoqueA, transaction); 

    await estoqueA.save({ transaction });
  

  } catch (error) {
    throw new Error('Erro ao atualizar o estoque: ' + error.message);
  }
};

estoque.inserirItem = async function (nome,validade,tipo, id_estoque, id_doador) {
  const transaction = await database.transaction();

  try {
    // Encontra o estoque pelo ID
    const estoqueA = await estoque.findByPk(id_estoque);
    // Verifica se o armazenamento disponível permite a inserção
    if (await estoque.verificaSeEPossivelInserirItem(id_estoque)) {
      throw new Error('Não há espaço disponível no estoque para inserir o item.');
    }

    const novoItem = await item.create(
      {
        nome,
        validade,
        tipo,
        id_estoque,
        id_doador,
      },
      { transaction }
    );

    // Atualiza o estoque
    await estoque.itemFoiInserido(novoItem, estoqueA, transaction);

    // Commit da transação
    await transaction.commit();

    return novoItem;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
estoque.itemFoiInserido = async function (novoItem, estoqueA, transaction) {
  try {
    // Atualiza o armazenamento disponível e a quantidade de itens no estoque
    estoqueA.armazenamento_disponivel -= 1; // Ou use o tamanho do item, se aplicável
    estoqueA.quantidadeItens += 1;

    // Cria um registro no histórico de alterações
    await alteracao.criarInsercaoDeItem(novoItem, estoqueA, transaction);

    // Salva as alterações no estoque
    await estoqueA.save({ transaction });
  } catch (error) {
    throw new Error('Erro ao atualizar o estoque: ' + error.message);
  }
};


// #endregion
module.exports = estoque;

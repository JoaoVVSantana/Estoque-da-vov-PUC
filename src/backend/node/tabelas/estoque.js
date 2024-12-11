import {
  DataTypes,
  alteracao,
  item
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

// #region Métodos



/*
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
*/

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
    id_gerente:1
  })

  
  return novoEstoque;
}

estoque.verificaSeExisteEstoque= async function (estoqueA) {
  return estoqueA ? true : false;
};

/*
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
*/

/*
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
*/

/*estoque.inserirItem = async function (nome,validade,tipo, id_estoque, id_doador) {
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

*/

/*
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
*/

// #endregion



// #region Lote de itens

estoque.inserirItemNoLote = async function (nome, validade, tipo, quantidade, id_estoque, id_doador, id_lote) {
  const transaction = await database.transaction();

  try {
    // Encontra o estoque pelo ID
    const estoqueA = await estoque.findByPk(id_estoque);
    
    // Verifica se o armazenamento disponível permite a inserção do item
    if (!(await estoque.verificaSeEPossivelInserirItem(id_estoque, quantidade))) {
      throw new Error('Não há espaço suficiente no estoque para inserir o item.');
    }

    // Verifica se o lote já existe
    let lote = await lote.findByPk(id_lote);

    // Se o lote não existir, cria um novo lote
    if (!lote) {
      lote = await lote.create(
        {
          nome,             // Nome do produto
          validade,         // Data de validade do lote
          tipo,             // Tipo do item
          quantidade,       // Quantidade do item no lote
          id_estoque,       // ID do estoque onde será armazenado
          id_doador,        // ID do doador responsável
        },
        { transaction }
      );

      // Atualiza o estoque com a inserção do lote
      await estoque.loteFoiInserido(lote, estoqueA, transaction);
    } else {
      // Se o lote já existir, apenas atualiza a quantidade
      lote.quantidade += quantidade; // Adiciona a quantidade do novo item ao lote existente
      await lote.save({ transaction });
    }

    // Cria o item e associa ao lote
    const novoItem = await item.create(
      {
        id_item,
        nome,
        validade,
        id_doador,
        id_lote,
        tipo // Associa o item ao lote
      },
      { transaction }
    );

    
    // Atualiza o estoque com a inserção do item
    await estoque.itemFoiInserido(novoItem, estoqueA, quantidade, transaction);

    // Commit da transação
    await transaction.commit();

    return novoItem;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// inserir item no estoque
estoque.itemFoiInserido = async function (novoItem, estoqueA, quantidade, transaction) {
  try {
    // Atualiza o armazenamento disponível e a quantidade de itens no estoque
    estoqueA.armazenamento_disponivel -= quantidade; // Ou use o tamanho do item, se aplicável
    estoqueA.quantidadeItens += quantidade;

    // Cria um registro no histórico de alterações
    await alteracao.criarInsercaoDeItem(novoItem, estoqueA, quantidade, transaction);

    // Salva as alterações no estoque
    await estoqueA.save({ transaction });
  } catch (error) {
    throw new Error('Erro ao atualizar o estoque: ' + error.message);
  }
};


// Verifica se é possível inserir o item no estoque
estoque.verificaSeEPossivelInserirItem = async function (id_estoque, quantidadeAdicional) {
  const estoqueAtual = await estoque.findByPk(id_estoque);
  if (!estoqueAtual) throw new Error('Estoque não encontrado.');

  const capacidadeDisponivel = estoqueAtual.capacidade - estoqueAtual.ocupado;
  return quantidadeAdicional <= capacidadeDisponivel;
};

// Atualizar o estoque com inserção do lote
estoque.loteFoiInserido = async function (lote, estoqueA, transaction) {
  estoqueA.quantidadeItens += lote.quantidade;
  await estoqueA.save({ transaction });
};


// retirar item do estoque / lote
estoque.retirarItem = async function (id_item, id_estoque, quantidade) {
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

    // Encontra o lote ao qual o item pertence
    const loteA = await lote.findByPk(itemA.id_lote);
    if (!loteA) {
      throw new Error(`Lote do item com ID ${id_item} não encontrado.`);
    }

    // Verifica se há quantidade suficiente no lote para a retirada
    if (loteA.quantidade < quantidade) {
      throw new Error(`Quantidade insuficiente no lote para retirada. Lote tem ${loteA.quantidade} itens disponíveis.`);
    }

    // Calcula a quantidade do item que será retirada e atualiza o lote
    loteA.quantidade -= quantidade; // Diminui a quantidade do lote

    // Se o lote atingir 0 de quantidade, remove o lote
    if (loteA.quantidade === 0) {
      await loteA.destroy({ transaction });
    } else {
      await loteA.save({ transaction });
    }

    // Atualiza o estoque com a retirada do item
    await estoque.itemFoiRetirado(id_item, id_estoque, quantidade, transaction);

    // Remove o item do estoque
    await itemA.destroy({ transaction });

    // Commit da transação
    await transaction.commit();

    return { message: 'Item retirado com sucesso', item: itemA.nome, quantidade };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// item retirado do estoque
estoque.itemFoiRetirado = async function (id_item, id_estoque, quantidade, transaction) {
  try {
    // Encontra o estoque pelo ID
    const estoqueA = await estoque.findByPk(id_estoque);

    // Encontra o item pelo ID
    const itemA = await item.findByPk(id_item);

    // Atualiza as quantidades no estoque
    estoqueA.armazenamento_disponivel += quantidade; // Aumenta o espaço no estoque
    estoqueA.quantidadeItens -= quantidade; // Atualiza o número de itens no estoque

    // Registra a retirada no histórico
    await alteracao.criarRetiradaDeItem(itemA, estoqueA, quantidade, transaction);

    // Salva as alterações no estoque
    await estoqueA.save({ transaction });

  } catch (error) {
    throw new Error('Erro ao atualizar o estoque com a retirada do item: ' + error.message);
  }
};

// #endregion
export default  estoque;
import { 
  DataTypes,
  item
} from './../../packages.js';
import database from '../../db/database.js';
const alteracao = database.define('alteracao', {
  id_alteracao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_alteracao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    references:{
      model: 'estoque',
      key: 'id_estoque',
    },
    allowNull: false,
  },
  id_gerente: {
    type: DataTypes.INTEGER,
    references:{
      model: 'gerente',
      key: 'id_gerente',
    },
    allowNull: false,
  },
  id_item: {
    type:DataTypes.INTEGER,
    references:{
      model: 'item',
      key: 'id_item',
    },
    allowNull:false,
  },
  
}, {
  tableName: 'alteracoes',
  timestamps: false,
});

// #region relacionamentos

// #endregion

// #region Métodos

// #endregion

// #region Lista de Itens
alteracao.criarInsercaoDeItem = async function (itemA, transaction) {
 
  try {
    // Cria a alteração no histórico
    await alteracao.create(
      {
        descricao: `Inserção: ${itemA.nome}`,
        data_alteracao: new Date(),
        tipo: 'entrada',
        id_estoque:1,
        id_item:itemA.id_item,
        id_gerente:1,
      },
      { transaction }
    );
  } catch (error) {
    throw new Error('Erro ao registrar a alteração: ' + error.message);
  };

}


alteracao.criarRetiradaDeItem = async function (itemA, transaction) {
  
  try {
    // Cria a alteração no histórico
    await alteracao.create(
      {
        descricao: `Retirada de ${1} ${itemA.nome}`,
        data_alteracao: new Date(),
        tipo: 'saída',
        id_estoque:1,
        id_item: itemA.id_item,
        id_gerente:1,
      },
      { transaction }
    );
  } catch (error) {
    throw new Error('Erro ao registrar a alteração: ' + error.message);
  };
  
}
// #endregion
export default  alteracao;

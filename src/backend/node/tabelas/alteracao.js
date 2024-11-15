import { 
  database,
  DataTypes,
} from './../../packages.js';
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
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_alteracao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  tipo: {
    type: DataTypes.ENUM('entrada', 'saída'),
    allowNull: false,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    
    allowNull: false,
  },
  id_historico: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'alteracoes',
  timestamps: false,
});

// #region relacionamentos

// #endregion

// #region Métodos


// #endregion
export default  alteracao;

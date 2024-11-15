import {
  database,
  DataTypes,
} from './../../packages.js';

const alerta = database.define('alerta', {
  id_alerta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_item: {
    type: DataTypes.INTEGER,
    allowNull: true,
    
    
  },
  id_gerente: {
    type: DataTypes.INTEGER,
    
    allowNull: true,
  },
}, {
  tableName: 'alertas',
  timestamps: false,
});

// #region relacionamentos

// #endregion

// #region Métodos
alerta.dispararParaGerente = async function () {
  
}
// #endregion
export default alerta;


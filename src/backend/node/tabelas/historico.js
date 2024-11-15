import {
  
  database,
  DataTypes,
} from './../../packages.js';

const historico = database.define('historico', {
  id_historico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  alteracoes: {
    type: DataTypes.INTEGER,
    
    allowNull: false,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
   
    allowNull: false,
  },
}, {
  tableName: 'historico',
  timestamps: false,
});

// #region relacionamentos

// #endregion

// #region Métodos
historico.exibirAlteracoes = async function () {

  const listaAlteracoes = await this.alteracoes;
  return listaAlteracoes;
}
// #endregion
export default  historico;


import {
  DataTypes,
} from './../../packages.js';
import database from '../../db/database.js';
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
  quantidadeAlteracoes: {
    type: DataTypes.INTEGER,
    
    allowNull: true,
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
historico.criarHistoricoNoBanco = async function (estoqueC) {
    const novoHistorico = await historico.create({
      id_estoque: estoqueC
    })

    return novoHistorico;
}
// #endregion
export default  historico;


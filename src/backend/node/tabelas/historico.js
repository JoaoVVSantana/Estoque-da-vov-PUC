import {
  DataTypes,
  sequelize,
  alteracao,
  estoque,
  historico
} from 'src/packages';

const historico = sequelize.define('historico', {
  id_historico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_alteracao: {
    type: DataTypes.INTEGER,
    references: {
      model: alteracao,
      key: 'id_alteracao',
    },
    allowNull: false,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: estoque,
      key: 'id_estoque',
    },
    allowNull: false,
  },
}, {
  tableName: 'historico',
  timestamps: false,
});

// #region relacionamentos
historico.hasMany(alteracao, { foreignKey: 'id_alteracao', as: 'alteracoes' });
historico.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });
// #endregion

// #region Métodos
historico.prototype.exibirAlteracoes = async function () {

  const listaAlteracoes = await this.getAlteracoes();
  return listaAlteracoes;
}
// #endregion
module.exports = historico;


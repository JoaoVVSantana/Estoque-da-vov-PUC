import {
  sequelize,
  alteracao,
  estoque,
  gerente,
} from 'src/packages';
const alteracao = sequelize.define('alteracao', {
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
    references: {
      model: estoque,
      key: 'id_estoque',
    },
    allowNull: false,
  },
}, {
  tableName: 'alteracoes',
  timestamps: false,
});

// #region relacionamentos
alteracao.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });
alteracao.belongsTo(gerente, { foreignKey: 'id_gerente', as: 'gerente' });
// #endregion

// #region Métodos


// #endregion
module.exports = alteracao;

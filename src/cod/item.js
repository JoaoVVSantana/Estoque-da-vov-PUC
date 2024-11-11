const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const estoque = require('./estoque');
const alerta = require('./alerta');

const item = sequelize.define('item', {
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validade: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('Medicamento', 'Alimento perecível', 'Alimento não perecível'),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: estoque,
      key: 'id_estoque',
    },
    allowNull: false,
  },
});

// #region relacionamentos
item.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });
// #endregion


// #region Métodos
item.prototype.criaAlertaVencimento = async function () { // Método pra criar alerta de vencimento
  const diasParaVencimento = (this.validade - new Date()) / (1000 * 60 * 60 * 24);
  if (diasParaVencimento < 30) {
    await alerta.create({
      conteudo: `O item ${this.nome} está próximo da data de vencimento.`,
      motivo: 'Validade Próxima',
      data_criacao: new Date(),
      id_item: this.id_item,
      id_estoque: this.id_estoque,
    });
  }
};

// #endregion


module.exports = item;

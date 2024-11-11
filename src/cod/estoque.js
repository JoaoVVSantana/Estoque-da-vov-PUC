const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const item = require('./item');
const alteracao = require('./alteracao');
const alerta = require('./alerta');
const historico = require('./historico');
const gerente = require('./gerente');

const estoque = sequelize.define('estoque', {
  id_estoque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  armazenamento_disponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'estoques',
  timestamps: false,
});

// #region relacionamentos
estoque.hasMany(item, { foreignKey: 'id_estoque', as: 'itens' });
item.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });

estoque.hasMany(historico, { foreignKey: 'id_estoque', as: 'alteracoes' });
historico.belongsTo(estoque, { foreignKey: 'id_estoque', as: 'estoque' });

estoque.belongsTo(gerente, { foreignKey: 'id_gerente', as: 'gerente' });
gerente.hasOne(estoque, { foreignKey: 'id_gerente', as: 'estoque' });
// #endregion

// #region Métodos
estoque.prototype.criaAlertaEstoqueBaixo = async function () { // Método pra criar alerta de estoque baixo pro gerente
  const itens = await this.getItens();
  const itensEmBaixa = itens.filter(item => item.estaEmBaixa());
  
  for (const item of itensEmBaixa) {
    await alerta.create({
      conteudo: `O item ${item.nome} está com estoque baixo.`,
      motivo: 'Baixa Quantidade',
      data_criacao: new Date(),
      id_estoque: this.id_estoque,
      id_gerente: this.id_gerente,
    });
  }
};

// #endregion



module.exports = estoque;

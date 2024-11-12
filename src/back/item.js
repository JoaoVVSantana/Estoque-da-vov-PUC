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
item.hasMany(alerta, { foreignKey: 'alerta', as: 'alertas' });
item.hasOne(doador, {foreignKey:'id_doador', as: 'doador'})
// #endregion


// #region Métodos
item.prototype.criaAlertaVencimento = async function () { // Método pra criar alerta de vencimento
  const diasParaVencimento = (this.validade - new Date()) / (1000 * 60 * 60 * 24);
  if (diasParaVencimento < 15) {
    await alerta.create({
      conteudo: `O item ${this.nome} está próximo da data de vencimento.`,
      motivo: 'Validade Próxima',
      data_criacao: new Date(),
      id_item: this.id_item,
      id_estoque: this.id_estoque,
      id_gerente:alerta.id_gerente,
    });
  }
};

item.prototype.criaAlertaBaixaQuantidade = async function () { // Método pra criar alerta de estoque baixo pro gerente
  const itens = await this.getItens();
  const itensEmBaixa = itens.filter(item => item.estaEmBaixaQuantidade());
  
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

item.prototype.estaEmBaixaQuantidade = async function () {
  if(this.item.quantidade<10) return true;
  else return false;
  
}

item.prototype.adicionarQuantidade = function (quantidadeAdicional) {
  this.quantidade += quantidadeAdicional;
  return this.save();
};

item.prototype.removerQuantidade = function (quantidadeRetirada) {
  if (this.quantidade < quantidadeRetirada) {
    throw new Error('Estoque insuficiente');
  }
  else {
    this.quantidade -= quantidadeRetirada;
  }
  
  return this.save();
};
// #endregion


module.exports = item;

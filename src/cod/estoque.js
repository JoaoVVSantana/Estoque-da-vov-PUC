
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Estoque = sequelize.define('Estoque', {
  id_estoque: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lista_itens: {
    type: DataTypes.ARRAY(require('./item.js')), // Exemplo para armazenar itens como JSON (pode ser FK pra Item)
    allowNull: true,
  },
  armazenamento_disponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  alteracoes_realizadas: {
    type: DataTypes.ARRAY(require('./historicoAlt.js')), // Pra registrar as alterações (pode ser uma relação com uma tabela Alterações)
    allowNull: true,
  },
  itens_perto_vencimento: {
     // Fazer uma logíca pra verificar quais itens tão pra vencer e colocar aqui
      type: DataTypes.ARRAY(require('./item.js')),
  },
}, {
  tableName: 'estoques',
  timestamps: false,
});

module.exports = Estoque;
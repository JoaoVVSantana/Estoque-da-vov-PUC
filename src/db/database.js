// database.js
const { Sequelize } = require('sequelize');

// Configurando o Sequelize para se conectar ao PostgreSQL
const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',  // ou o endereço do seu banco de dados
  dialect: 'postgres',
});

module.exports = sequelize;

// Agora tá com o sequelize pra conectar num postgre, vamos ver a possibilidade de passar isso pra um SQLite. 
const { Sequelize } = require('sequelize');

// Configurando o Sequelize pra se conectar ao Postgre, temos q criar essa conexao ai
const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',  // ou o endereço do banco de dados
  dialect: 'postgres',
});

module.exports = sequelize;

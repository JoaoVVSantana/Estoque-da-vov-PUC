import database from './database.js';
//Pra ativar esse módulo usar npm run sync > está definido no package.json em scripts

//login no banco
database.authenticate()
  .then(() => {
    console.log('Conectado ao BD com sucesso.');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  })
  .finally(() => {
    console.log('Tentativa de conexão concluída.');
    // Continua a execução mesmo em caso de erro
  });
// Pega os modelos que estão feitos na pasta "tabelas" e sincroniza com o banco.
// Pra não ficar executando isso toda vez que rodar o app, vai ficar nesse moodulo
database.sync({ alter: true }).then(() => {
    console.log('Banco sincronizado com sucesso.');
  }).catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
  });
import database from './database.js';


const executarSincronizacao = async () => {
  await autenticarBanco();
  await sincronizarBanco();
  console.log('Sincronização concluída.');
  process.exit(0); 
};

const autenticarBanco = async () => {
  try {
    await database.authenticate();
    console.log('Conectado ao BD com sucesso.');
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err);
    process.exit(1); 
  }
};

const sincronizarBanco = async () => {
  try {
    //await database.sync({ alter: true });
    await database.sync({ alter: true,force: true }); //isso força o banco a mudar conforme o sequelize
    //!!! DESATIVAR DEPOIS Q ACABAR O DESENVOLVIMENTO!!!
    console.log('Banco sincronizado com sucesso.');
  } catch (err) {
    console.error('Erro ao sincronizar o banco:', err);
    process.exit(1);
  }
};


executarSincronizacao();


import {
  express,
  DataTypes,
  Sequelize,
  sequelize,
  dotenv,
  cors,
  jwt,
  bcrypt,
  router,
  itemRoutes,
  doacaoRoutes,
  authRoutes,
  estoqueRoutes,
  autenticarToken,
  app,
  PORT,
  alerta,
  alteracao,
  doacao,
  doador,
  estoque,
  gerente,
  historico,
  item
} from 'src/packages';

//Enviar email pro doador com um texto pronto e os itens que estão faltando no estoque
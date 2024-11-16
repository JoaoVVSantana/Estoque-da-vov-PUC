import 'module-alias/register.js';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import database from '../db/database.js';
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

//#region Importando rotas
//import autenticarToken from '../backend/middlewares/autenticarToken.js';
//import authRoutes from '../backend/node/routes/authRoutes.js';
import itemRoutes from '../node/routes/itemRoutes.js';
import doacaoRoutes from '../node/routes/doacaoRoutes.js';
import alteracaoRoutes from '../node/routes/alteracaoRoutes.js';
import estoqueRoutes from '../node/routes/estoqueRoutes.js';
//#endregion

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());
//Por enquanto vamos usar o cors permitindo que qualquer host acesse a API, sem fazer autenticacao
//api.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Chamada principal das rotas
console.log('Registrando rotas...');
//app.use('/api/login',auth)
//app.use('/api/auth', authRoutes);
app.use('/api/item', itemRoutes);
app.use('/api', doacaoRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api',alteracaoRoutes);
console.log('Rotas registradas.');
app._router.stack.forEach((layer) => {
  if (layer.route) {
    console.log(layer.route.path);
  }
});

//caso n encontre rota
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

//inicio do server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

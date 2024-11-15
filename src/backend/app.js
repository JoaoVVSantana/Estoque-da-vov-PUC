import 'module-alias/register.js';
import {
  database,
  itemRoutes,
  doacaoRoutes,
  alteracaoRoutes,
  authRoutes,
  estoqueRoutes,
  autenticarToken,
} from './packages.js';


import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT || 4000;
const app = express();

//login no banco
database.authenticate()
  .then(() => console.log('Conectado ao BD com sucesso.'))
  .catch((err) => console.error('Não foi possível conectar ao banco de dados:', err));

// sincronização do banco
database.sync({ alter: true }).then(() => {
  console.log('Banco sincronizado com sucesso.');
}).catch((err) => {
  console.error('Erro ao sincronizar o banco:', err);
});


//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/items', autenticarToken, itemRoutes);
app.use('/api/doacoes', autenticarToken, doacaoRoutes);
app.use('/api/estoque', autenticarToken, estoqueRoutes);
app.use('/api/alteracao', autenticarToken, alteracaoRoutes);

//caso n encontre rota
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

//inicio do server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

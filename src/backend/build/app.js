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
import enviarEmail from '../node/routes/enviarEmail.js';

//#endregion

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());

//Por enquanto vamos usar o cors permitindo que qualquer host acesse a API, sem fazer autenticacao
//api.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use('/api/login',auth)
//app.use('/api/auth', authRoutes);


// ----------- V = Funcionando
// ----------- X = Não Funcionando

app.use('/api/item', itemRoutes);
/// V /itensPertoDoVencimento -> exibe uma lista de todos os itens que estão perto de vencer

app.use('/api/doacoes', doacaoRoutes);
// V /registrarDoador -> recebe nome e email, cadastra no banco

app.use('/api/estoque', estoqueRoutes);
// V /criarEstoque -> cria um estoque no banco
// V /retirarItem -> recebe um id de item por param e deleta do banco
// V /inserirItem -> recebe nome,validade,tipo no body. Cria e coloca no banco
// V /itensFaltando -> exibe uma lista de itens que estão com quantidade 5<



app.use('/api/alteracoes',alteracaoRoutes);
// X //historico -> exibe o historico de todas as alteracoes

app.use('/api/email',enviarEmail);
// V /pedirDoacao -> recebe nome e email, constroi uma msg com os itens em falta

//caso n encontre rota
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

//inicio do server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

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
// POST http://localhost:5000/api/item/itensPertoDoVencimento -> exibe uma lista de todos os itens que estão perto de vencer

app.use('/api/doacoes', doacaoRoutes);
// POST http://localhost:5000/api/doacoes/registrarDoador -> recebe nome e email, cadastra no banco
// POST http://localhost:5000/api/doacoes/registrarDoacao -> recebe nomeDoador, nomeItem, validade e tipo, cria doador (sem email) chama a outra API de inserir no estoque
// GET http://localhost:5000/api/doacoes/todosItensDeDoacoes -> exibe todos os itens que possuem um doador/foram doados
// GET http://localhost:5000/api/doacoes/doadores -> exibe todos doadores cadastrados

app.use('/api/estoque', estoqueRoutes);
// POST http://localhost:5000/api/estoque/criarEstoque -> cria um estoque no banco
// DELETE http://localhost:5000/api/estoque/retirarItem -> recebe um id de item por BODY e deleta do banco
// DELETE http://localhost:5000/api/estoque/:id/retirar -> recebe um id de item por PARAM e deleta do banco
// POST http://localhost:5000/api/estoque/inserirItem -> recebe nome,validade,tipo no body. Cria e coloca no banco
// POST http://localhost:5000/api/estoque/itensFaltando -> exibe uma lista de itens que estão com quantidade 5<



app.use('/api/alteracoes',alteracaoRoutes);
// GET http://localhost:5000/api/alteracoes/historico -> exibe o historico de todas as alteracoes
// GET http://localhost:5000/api/alteracoes/historicoMesAtual -> exibe as alteracoes feitas no mes em que é chamada
// GET http://localhost:5000/api/alteracoes/historicoDiaEspecifico -> recebe uma data no formato "YYYY/MM/DD" exibe alteracoes no dia

app.use('/api/email',enviarEmail);
// V /pedirDoacao -> recebe nome e email, constroi uma msg com os itens em falta

//caso n encontre rota
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

//inicio do server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

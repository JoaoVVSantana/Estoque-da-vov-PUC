import 'module-alias/register.js';
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

//Autenticação de rotas ainda não implementada >
// %% import auth from '.././middlewares/auth.js';
import {corsConfig} from '.././middlewares/cors.js';

// import autenticarToken from '.././middlewares/autenticarToken.js';

import itemRoutes from '../node/routes/itemRoutes.js';
import doacaoRoutes from '../node/routes/doacaoRoutes.js';
import alteracaoRoutes from '../node/routes/alteracaoRoutes.js';
import estoqueRoutes from '../node/routes/estoqueRoutes.js';




const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(corsConfig);


//Por enquanto vamos usar o cors permitindo que qualquer host acesse a API
//api.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use('/api/login',auth)
// %% app.use('/api/auth', auth);
// POST http://localhost:5000/api/auth/login -> id, senha

// %% app.use(autenticarToken);

// TODAS QUE ESTÃO FUNCIONANDO ESTOU LISTADAS EM BAIXO DOS MÉTODOS

// %% app.use('/api/item', autenticarToken, itemRoutes);
app.use('/api/item', itemRoutes);
// GET http://localhost:5000/api/item/itensPertoDoVencimento -> exibe uma lista de todos os itens que estão perto de vencer
// GET http://localhost:5000/api/item/itensVencidos -> exibe uma lista de todos os itens que estão vencidos


// %% app.use('/api/doacoes',  autenticarToken,doacaoRoutes);
app.use('/api/doacoes',doacaoRoutes);
// POST http://localhost:5000/api/doacoes/registrarDoador -> nomeCompletoDoador, emailDoador -> cadastra no banco
// POST http://localhost:5000/api/doacoes/registrarDoacao -> nomeCompletoDoador, nomeItem, validade, tipo -> cria doador (sem email) chama a outra API de inserir no estoque
// GET http://localhost:5000/api/doacoes/todosItensDeDoacoes -> exibe todos os itens que possuem um doador/foram doados
// GET http://localhost:5000/api/doacoes/doadores -> exibe todos doadores cadastrados
// DELETE http://localhost:5000/api/doacoes/:id/apagarDoador -> id_doador -> remove da base
// PUT http://localhost:5000/api/doacoes/:id/atualizarDoador pega id do doador e ATUALIZAR NOME OU EMAIL DO DOADOR
// GET http://localhost:5000/api/doacoes/:id/doador  PEGAR DOADOR ESPECÍFICO PELO ID

// %% app.use('/api/estoque', autenticarToken, estoqueRoutes);
app.use('/api/estoque', estoqueRoutes);
// POST http://localhost:5000/api/estoque/criarEstoque -> armazenamento -> cria um estoque no banco
// DELETE http://localhost:5000/api/estoque/retirarItem -> id_item ->  por BODY e deleta do banco
// DELETE http://localhost:5000/api/estoque/retirar/:id_item -> id_item ->  por PARAM e deleta do banco
// % POST http://localhost:5000/api/estoque/inserirItem -> nome, validade, tipo, *id_lote*, id_doador(pode ser nulo) -> Cria e coloca no banco
// % POST http://localhost:5000/api/estoque/inserirItemDoacao -> nome, validade, tipo, *id_lote*, id_doador  -> Cria e coloca no banco
// GET http://localhost:5000/api/estoque/itensFaltando -> exibe uma lista de itens que estão com quantidade 5<
// GET http://localhost:5000/api/estoque/listarItens -> exibe todos itens do estoque
// PUT http://localhost:5000/api/estoque//atualizarItem/:id_item -> id_item - novosDados -> atualiza um item por id recebido no param
// % POST http://localhost:5000/api/estoque/criarLote -> nome -> Cria o lote e o id é autoincrement
// GET http://localhost:5000/api/estoque/lote/22 pega um lote especifico pelo id
// GET http://localhost:5000/api/estoque/lotes retorna lista com todos os lotes
// GET http://localhost:5000/api/estoque/lotes/22/itens  retorna lista com todos os lotes pelo um id especifico
// DELETE http://localhost:5000/api/estoque/lote/5 apaga um lote pelo id


// %% app.use('/api/alteracoes', autenticarToken,alteracaoRoutes);
app.use('/api/alteracoes', alteracaoRoutes);
// GET http://localhost:5000/api/alteracoes/historico -> exibe o historico de todas as alteracoes
// GET http://localhost:5000/api/alteracoes/historicoMesAtual -> exibe as alteracoes feitas no mes em que é chamada
// GET http://localhost:5000/api/alteracoes/historicoDiaEspecifico -> dateCalendario -> recebe uma data no formato "YYYY/MM/DD" exibe alteracoes no dia
// GET http://localhost:5000/api/alteracoes/relatorioDeConsumo -> dataInicioRaw, dataFimRaw -> retorna as retiradas de um período de tempo específico.


//caso n encontre rota
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

//inicio do server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

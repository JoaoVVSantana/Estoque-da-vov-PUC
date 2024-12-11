import {
  estoque,
  item
} from './../../packages.js';
import express from 'express';
import autenticarToken from '../../middlewares/autenticarToken.js';
import { loteDeItens } from '../tabelas/relacionamentos.js';
const router = express.Router();

//CRIAR ESTOQUE NO BANCO
router.post('/criarEstoque', autenticarToken,async (req, res) => {
  const { armazenamento } = req.body;
  try {
    const criarEstoque = estoque.criarEstoqueNoBanco(armazenamento);

    res.json({ message: 'Estoque Criado Com Sucesso, ID: ', estoque: criarEstoque.id_estoque });
  } catch (error) {
    console.error('Erro ao criar Estoque: ', error);
    res.status(400).json({ error: error.message });
  }
});

//CRIAR ESTOQUE NO BANCO
router.post('/criarLote', autenticarToken,async (req, res) => {
  const { nome } = req.body;
  try {
    const novoLote = loteDeItens.create({
      id_estoque:1,
      nome:nome,
      quantidade:0
    })

    res.json({ message: 'Estoque Criado Com Sucesso, ID: ', estoque: criarEstoque.id_estoque });
  } catch (error) {
    console.error('Erro ao criar Estoque: ', error);
    res.status(400).json({ error: error.message });
  }
});

// RELATÓRIO DE ITENS EM FALTA NO ESTOQUE
router.get('/itensFaltando', autenticarToken,async (req, res) => {
  const id_estoque = 1;

  try {
    const estoqueA = await estoque.findByPk(id_estoque);
    if (!estoqueA) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    const listaDosItens = await item.todosItensEmBaixaQuantidade();

    res.json({
      message: 'Itens em Falta:',
      itens: listaDosItens.map(item => ({
        nome: item.nome,
      })),
    });

  } catch (error) {
    console.error('Erro ao processar o relatório:', error);
    res.status(400).json({ error: error.message });
  }
});

// LISTA TODOS ITENS DO ESTOQUE
router.get('/listarItens', autenticarToken,async (req, res) => {
  try {
    const todosItens = await item.buscarTodosItens();
    res.json({
      message: 'Lista de todos os itens no estoque',
      itens: todosItens,
    });
  } catch (error) {
    console.error('Erro ao buscar todos os itens:', error);
    res.status(400).json({ error: error.message });
  }
});

//ALTERA OS DADOS DE UM ITEM ESPECIFICO ATRAVÉS DE SEU ID
router.put('/atualizarItem/:id_item', autenticarToken,async (req, res) => {
  const { id_item }  = req.params;

  const novosDados = req.body;

  try {
    const itemAtualizado = await item.atualizarItem(id_item, novosDados);

    res.json({
      message: 'Item atualizado com sucesso',
      item: itemAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar o item:', error);
    res.status(400).json({ error: error.message });
  }
});

// RETIRAR ITEM DO ESTOQUE POR BODY
router.post('/retirarItem', autenticarToken, async (req, res) => {
  const {id_lote, quantidade} = req.body; // Agora, 'quantidade' e 'id_lote' são obrigatórios

  // Verifica se os dados obrigatórios foram inseridos
  if (!id_item || !quantidade) {
    return res.status(400).json({ error: 'Os campos id_item e quantidade são obrigatórios.' });
  }

  try {
    // Chama a função para retirar o item do lote
    await loteDeItens.retirarItens(id_lote,quantidade); // Passa o ID do estoque (1) e a quantidade

    res.json({ message: 'Retirada realizada com sucesso', item: id_item, quantidade });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

// INSERIR ITEM NO ESTOQUE COM LOTE 
router.post('/inserirItem', autenticarToken, async (req, res) => {
  const { nome, validade, tipo, quantidade, id_lote,id_doador } = req.body;
  // Verifica se os dados obrigatórios foram inseridos
  if (!nome || !validade || !tipo || !quantidade || !id_lote) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, validade, tipo, quantidade, id_lote' });
  }
  try {
    // Chama a função para inserir o item no lote
    const itensAdicionados = await loteDeItens.adicionarItens(nome,validade,tipo, id_doador, id_lote,quantidade)

    // Retorna uma resposta de sucesso
    res.json({
      message: 'Adicionado no estoque: ',
      quantidade: itensAdicionados.count(),
      nome: item.nome
    });
  } catch (error) {
    console.error('Erro ao inserir o item no estoque: ', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
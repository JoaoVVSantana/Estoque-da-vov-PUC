import {
  estoque,
  item
} from './../../packages.js';
import express from 'express';
import autenticarToken from '../../middlewares/autenticarToken.js';
import database from '../../db/database.js';
import { loteDeItens } from '../tabelas/relacionamentos.js';
const router = express.Router();

//CRIAR ESTOQUE NO BANCO
router.post('/criarEstoque', async (req, res) => {
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
router.post('/criarLote', async (req, res) => {
  const { nome } = req.body;
  try {
    const novoLote = loteDeItens.create({
      id_estoque: 1,
      nome: nome,
      quantidade: 0
    })

    res.json({ message: 'Lote Criado Com Sucesso, ', novoLote });
  } catch (error) {
    console.error('Erro ao criar Estoque: ', error);
    res.status(400).json({ error: error.message });
  }
});

// RELATÓRIO DE ITENS EM FALTA NO ESTOQUE
router.get('/itensFaltando', async (req, res) => {
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
router.get('/listarItens', async (req, res) => {
  try {
    const todosItens = await item.findAll();
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
router.put('/atualizarItem/:id_item', async (req, res) => {
  const { id_item } = req.params;

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
router.post('/retirarItem', async (req, res) => {
  const { id_item } = req.body;

  // Verifica se os dados obrigatórios foram inseridos
  if (!id_item) {
    return res.status(400).json({ error: 'O campo id_item é obrigatório.' });
  }

  const transaction = await database.transaction();
  try {

    await loteDeItens.retirarItem(id_item, transaction);

    transaction.commit();
    res.json({ message: 'Retirada realizada com sucesso', item: id_item });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
    await transaction.rollback();
  }
});

// INSERIR ITEM NO ESTOQUE COM LOTE 
router.post('/inserirItem', async (req, res) => {
  const { nome, validade, tipo, quantidade, id_lote, id_doador } = req.body;
  // Verifica se os dados obrigatórios foram inseridos
  if (!nome || !validade || !tipo || !quantidade || !id_lote) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, validade, tipo, quantidade, id_lote' });
  }
  const transaction = await database.transaction();
  try {


    if (quantidade > 1) {
      await loteDeItens.adicionarVariosItens(nome, validade, tipo, id_doador, id_lote, quantidade, transaction)
    }
    else if (quantidade == 1) {
      await loteDeItens.adicionarUmItem(nome, validade, tipo, id_doador, id_lote, transaction)
    }
    else return res.status(400).json({ error: 'Quantidade inválida' });

    await transaction.commit();
    // Retorna uma resposta de sucesso
    res.json({
      message: 'Adicionado no estoque: ',
      quantidade: quantidade,
      nome: nome
    });
  } catch (error) {
    console.error('Erro ao inserir o item no estoque: ', error);
    res.status(400).json({ error: error.message });
    await transaction.rollback();
  }
});

// RETORNA UM LOTE ESPECÍFICO PELO ID
router.get('/lote/:id', async (req, res) => {
  const { id } = req.params; // Pega o ID do lote da URL

  try {
    const lote = await loteDeItens.findByPk(id); // Busca o lote pelo ID
    if (!lote) {
      return res.status(404).json({ message: 'Lote não encontrado.' });
    }

    res.status(200).json({
      message: 'Lote encontrado com sucesso!',
      lote: {
        id_lote: lote.id_lote,
        id_estoque: lote.id_estoque,
        nome: lote.nome,
        quantidade: lote.quantidade,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar o lote:', error);
    res.status(500).json({ error: 'Erro ao buscar o lote.' });
  }
});

// RETORNA TODOS OS LOTES
router.get('/lotes', async (req, res) => {
  try {
    const lotes = await loteDeItens.findAll(); // Busca todos os lotes no banco de dados
    if (!lotes.length) {
      return res.status(404).json({ message: 'Nenhum lote encontrado.' });
    }

    // Mapeia os lotes para incluir as informações desejadas
    const response = lotes.map(lote => ({
      id_lote: lote.id_lote,
      id_estoque: lote.id_estoque,
      nome: lote.nome,
      quantidade: lote.quantidade,
    }));

    res.status(200).json({
      message: 'Lotes encontrados com sucesso!',
      lotes: response,
    });
  } catch (error) {
    console.error('Erro ao buscar os lotes:', error);
    res.status(500).json({ error: 'Erro ao buscar os lotes.' });
  }
});

// RETORNA TODOS OS ITENS DE UM LOTE
router.get('/lotes/:id_lote/itens', async (req, res) => {
  const { id_lote } = req.params; // Pega o id do lote a partir dos parâmetros da URL

  try {
    // Busca todos os itens relacionados ao lote pelo id_lote, incluindo todos os campos necessários
    const itens = await item.findAll({
      where: { id_lote },
      attributes: ['id_item', 'nome', 'validade', 'id_doador', 'id_lote', 'tipo'], // Seleciona os campos específicos
    });

    if (!itens.length) {
      return res.status(404).json({ message: 'Nenhum item encontrado para este lote.' });
    }

    // Mapeia os itens para a resposta
    const response = itens.map(item => ({
      id_item: item.id_item,
      nome: item.nome,
      validade: item.validade,
      id_doador: item.id_doador,
      id_lote: item.id_lote,
      tipo: item.tipo,
    }));

    res.status(200).json({
      message: 'Itens encontrados com sucesso!',
      itens: response,
    });
  } catch (error) {
    console.error('Erro ao buscar itens do lote:', error);
    res.status(500).json({ error: 'Erro ao buscar itens do lote.' });
  }
});




export default router;
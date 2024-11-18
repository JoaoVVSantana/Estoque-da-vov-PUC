import {
  //autenticarToken,
  estoque,
  item
} from './../../packages.js';
import database from '../../db/database.js';
import express from 'express';
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

})
/// RETIRAR DO ESTOQUE POR BODY
router.post('/retirarItem', async (req, res) => {
  const { id_item } = req.body;
  try {
    await estoque.retirarItem(id_item, 1)
    res.json({ message: 'Retirada realizada com sucesso ', item: id_item });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

/// RETIRAR DO ESTOQUE POR PARAMS
router.delete('/:id/retirar', async (req, res) => {
  const { id_item } = req.params;
  try {
    await estoque.retirarItem(id_item, 1)
    res.json({ message: 'Retirada realizada com sucesso ', item: id_item });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

// INSERIR ITEM NO ESTOQUE (sem Doacao)
router.post('/inserirItem', async (req, res) => {
  const { nome, validade, tipo, id_doador } = req.body; //notnull
  const id_estoque = 1;
  //verifica se os dados foram inseridos
  if (!nome || !validade || !tipo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, validade, tipo' });
  }

  try {
    await estoque.inserirItem(nome, validade, tipo, id_estoque)

    res.json({ message: 'Item inserido com sucesso', item: nome });
  } catch (error) {
    console.error('Erro ao inserir o item:', error);
    res.status(400).json({ error: error.message });
  }
});
// INSERIR ITEM NO ESTOQUE (com Doacao)
router.post('/inserirItemDoacao', async (req, res) => {
  const { nome, validade, tipo, id_doador } = req.body; //notnull
  const id_estoque = 1;
  //verifica se os dados foram inseridos
  if (!nome || !validade || !tipo|| !id_doador) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, validade, tipo, id_doador' });
  }

  try {
    await estoque.inserirItem(nome, validade, tipo, id_estoque, id_doador)

    res.json({ message: 'Item inserido com sucesso', item: nome });
  } catch (error) {
    console.error('Erro ao inserir o item:', error);
    res.status(400).json({ error: error.message });
  }
});

// RELATÓRIO DE ITENS EM FALTA NO ESTOQUE
router.get('/itensFaltando', async (req, res) => {
  const id_estoque = 1;
  // Verifica se o estoque existe
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
// ATENÇÃO VERIFIQUE SE ESTA CORRETO A IMPLEMENTAÇÃO, MAS ESTA FUNCIONANDO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// LISTA TODOS ITENS DO ESTOQUE
router.get('/listarItens', async (req, res) => {
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
// ATENÇÃO VERIFIQUE SE ESTA CORRETO A IMPLEMENTAÇÃO, MAS ESTA FUNCIONANDO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

export default router;
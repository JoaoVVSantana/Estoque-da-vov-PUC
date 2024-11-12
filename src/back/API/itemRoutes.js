// src/routes/itemRoutes.js
const express = require('express');
const item = require('../tabelas/item'); // Modelo de item

const router = express.Router();

// Rota para criar um novo item
router.post('/', async (req, res) => {
  const { nome, categoria } = req.body;

  try {
    const novoItem = await Item.create({ nome, categoria });
    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({ error: 'Erro ao criar item' });
  }
});

// Rota para listar todos os itens
router.get('/', async (req, res) => {
  try {
    const itens = await Item.findAll();
    res.json(itens);
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({ error: 'Erro ao listar itens' });
  }
});

// INSERIR NO ESTOQUE
router.post('/api/estoques/:id_estoque/retirada', autenticarToken, async (req, res) => { 
  const { id_estoque } = req.params;
  const { itemId, quantidade } = req.body;

  // Verifica se o estoque existe
  try {
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
  //Se existir >
    const itemAtualizado = await estoqueEncontrado.retirarItem(itemId, quantidade); // Usa a função async da classe do estoque pra lógica
    res.json({ message: 'Retirada realizada com sucesso', item: itemAtualizado });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

//RETIRAR DO ESTOQUE
router.post('/api/estoques/:id_estoque/retirada', autenticarToken, async (req, res) => { 
  const { id_estoque } = req.params;
  const { itemId, quantidade } = req.body;

  // Verifica se o estoque existe
  try { 
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    //Se existir >
    const itemAtualizado = await estoqueEncontrado.retirarItem(itemId, quantidade); // Usa a função async da classe do estoque pra lógica
    res.json({ message: 'Retirada realizada com sucesso', item: itemAtualizado });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

import {
  autenticarToken,
  estoque,
  item
} from './../../packages.js';

import express from 'express';
const router = express.Router();

// Criar um novo item NO BANCO DE DADOS, NÃO É PARA INSERIR NO ESTOQUE.
router.post('/api/item/criar', async (req, res) => {
  const { nome, validade, tipo} = req.body;

  try {
    const novoItem = await item.create({nome,validade,tipo});
    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({ error: 'Erro ao criar item' });
  }
});

// Listar todos os itens QUE ESTÃO NO BANCO DE DADOS, NÃO NO ESTOQUE
router.get('/api/item/listar', async (req, res) => {

  try {
    const itens = await item.findAll();
    res.json(itens);
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({ error: 'Erro ao listar itens' });
  }
});



//RETIRAR DO ESTOQUE
router.post('/api/estoques/:id_estoque/retirada', autenticarToken, async (req, res) => { 
  const {id_item} = req.body;


  try { 
    const estoqueEncontrado = await estoque.findByPk(1); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
   
    const itemAtualizado = await estoqueEncontrado.retirarItem(id_item); // Usa a função async da classe do estoque pra lógica
    res.json({ message: 'Retirada realizada com sucesso', item: itemAtualizado });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
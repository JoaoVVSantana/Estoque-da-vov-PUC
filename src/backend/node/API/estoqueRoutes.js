import {
  autenticarToken,
  estoque
} from './../../packages.js';

import express from 'express';
const router = express.Router();
/// RETIRAR DO ESTOQUE 
router.post('/api/estoque/item/retirar', autenticarToken, async (req, res) => { 
  const { id_estoque } = req.params;
  const { itemId} = req.body;

  // Verifica se o estoque existe
  try { 
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    //Se existir >
    const itemAtualizado = await estoqueEncontrado.retirarItemDoEstoque(itemId); // Usa a função async da classe do estoque pra lógica
    res.json({ message: 'Retirada realizada com sucesso', item: itemAtualizado });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

// INSERIR ITEM NO ESTOQUE
router.post('/api/estoque/item/inserir', autenticarToken, async (req, res) => { 
const { nome, validade, tipo } = req.body;
try {
  const estoqueEncontrado = await estoque.findByPk(1); 
  if (!estoqueEncontrado) {
    return res.status(404).json({ error: 'Estoque não encontrado' });
  }
  const novoItem = await item.criarItemNoEstoque(nome, validade, tipo);
  
  const itemAtualizado = await estoqueEncontrado.inserirItemNoEstoque(itemEncontrado); // Usa a função async da classe do estoque pra lógica
  res.json({ message: 'Item inserido com sucesso', item: novoItem });
} catch (error) {
  console.error('Erro ao inserir o item:', error);
  res.status(400).json({ error: error.message });
}
});

// RELATÓRIO DE ITENS EM FALTA NO ESTOQUE
router.get('/api/estoque/itemsFaltando', autenticarToken, async (req,res) => {
const { id_estoque } = req.params;

// Verifica se o estoque existe
try {
  const estoqueEncontrado = await estoque.findByPk(id_estoque); 
  if (!estoqueEncontrado) {
    return res.status(404).json({ error: 'Estoque não encontrado' });
  }
//Se existir >
  
// TERMINAR AQUI ***************************
} catch (error) {
  console.error('Erro ao processar o relatório:', error);
  res.status(400).json({ error: error.message });
}
});

export default router;
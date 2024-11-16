import {
  //autenticarToken,
  estoque,
  item
} from './../../packages.js';
import database from '../../../db/database.js';
import express from 'express';
const router = express.Router();




//CRIAR ESTOQUE NO BANCO
router.post('/criarEstoque', async (req,res) => {
  const {armazenamento}=req.body;
  try { 
    const criarEstoque = estoque.criarEstoqueNoBanco(armazenamento);
    
    res.json({ message: 'Estoque Criado Com Sucesso, ID: ', estoque:criarEstoque.id_estoque });
  } catch (error) {
    console.error('Erro ao criar Estoque: ', error);
    res.status(400).json({ error: error.message });
  }

})
/// RETIRAR DO ESTOQUE 
router.post('/:id_estoque/retirar', async (req, res) => { 
  const { id_estoque } = req.params;
  const { id_item} = req.body;
  try { 
    await estoque.retirarItem(id_item, id_estoque)
    res.json({ message: 'Retirada realizada com sucesso ', item: id_item });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

// INSERIR ITEM NO ESTOQUE
router.post('/:id_estoque/inserirItem',  async (req, res) => { 
const dadosItem = req.body; //nome, validade e tipo!!!
const {id_estoque} = req.params;
try {
  await estoque.inserirItem(dadosItem, id_estoque)
  
  res.json({ message: 'Item inserido com sucesso', item: novoItem });
} catch (error) {
  console.error('Erro ao inserir o item:', error);
  res.status(400).json({ error: error.message });
}
});

// RELATÓRIO DE ITENS EM FALTA NO ESTOQUE
router.get('/:id_estoque/itensFaltando',  async (req,res) => {
const { id_estoque } = req.params;
// Verifica se o estoque existe
try {
  const estoqueA = await estoque.findByPk(id_estoque); 
  if (!estoqueA) {
    return res.status(404).json({ error: 'Estoque não encontrado' });
  }

  
// TERMINAR AQUI ***************************
} catch (error) {
  console.error('Erro ao processar o relatório:', error);
  res.status(400).json({ error: error.message });
}
});

export default router;
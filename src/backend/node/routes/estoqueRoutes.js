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
router.post('/retirarItem', async (req, res) => { 
  const { id_item} = req.body;
  try { 
    await estoque.retirarItem(id_item, 1)
    res.json({ message: 'Retirada realizada com sucesso ', item: id_item });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

// INSERIR ITEM NO ESTOQUE
router.post('/inserirItem',  async (req, res) => { 
const {nome,validade,tipo} = req.body; //notnull
const id_estoque = 1;
try {
  await estoque.inserirItem(nome,validade,tipo, id_estoque)
  
  res.json({ message: 'Item inserido com sucesso', item: nome });
} catch (error) {
  console.error('Erro ao inserir o item:', error);
  res.status(400).json({ error: error.message });
}
});

// RELATÓRIO DE ITENS EM FALTA NO ESTOQUE
router.get('/itensFaltando',  async (req,res) => {
const  id_estoque  = 1;
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

export default router;
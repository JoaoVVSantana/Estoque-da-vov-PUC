import {
  //autenticarToken,
  //estoque,
  //item
} from './../../packages.js';
import{estoque,item} from '../tabelas/relacionamentos.js';
import express from 'express';
const router = express.Router();



// Criar um novo item NO BANCO DE DADOS, NÃO É PARA INSERIR NO ESTOQUE.
router.post('/criar', async (req, res) => {
  const { nome, validade, tipo} = req.body;
  const {id_estoque} = req.params;

  try {
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    const novoItem = await item.create({nome,validade,tipo,id_estoque});
    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({ error: 'Erro ao criar item' });
  }
});

// Listar todos os itens registrados
router.get('/listar', async (req, res) => {
  
  try {
    const itens = await item.findAll();
    res.json(itens);
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({ error: 'Erro ao listar itens' });
  }
});



export default router;
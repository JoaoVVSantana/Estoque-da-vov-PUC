const express = require('express');
const alteracao = require('../tabelas/alteracao'); // Modelo de estoque, que contém métodos de criação


const router = express.Router();

//HISTORICO DE ALTERACOES
router.get('/api/historico', autenticarToken, async (req, res) => { 
    try {
      const historicoCompleto = await historico.findAll({include: [{ model: alteracao, as: 'alteracoes' }] });
  
      res.json(historicoCompleto);
    } catch (error) {
      console.error('Erro ao buscar o histórico de alterações:', error);
      res.status(500).json({ error: 'Erro ao buscar o histórico de alterações' });
    }
  });
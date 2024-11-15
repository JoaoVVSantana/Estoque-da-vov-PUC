import {
  autenticarToken,
  alteracao,
  historico
}from './../../packages.js';

import express from 'express';
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

  export default router;
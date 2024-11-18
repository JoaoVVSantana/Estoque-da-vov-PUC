import {
  //autenticarToken,
  alteracao,
  historico
}from './../../packages.js';

import express from 'express';
const router = express.Router();

//HISTORICO DE ALTERACOES
router.get('/historico', async (req, res) => { 
    try {
      const historicoCompleto = await alteracao.findAll();
  
      res.json(historicoCompleto);

    } catch (error) {
      console.error('Erro ao buscar o histórico de alterações:', error);
      res.status(500).json({ error: 'Erro ao buscar o histórico de alterações' });
    }
});

  router.get('/historicoMesAtual', async (req, res) => { 
    try {
      const mesAtual = new Date().getMonth(); // Índice do mês atual (0 = Janeiro)
      const anoAtual = new Date().getFullYear(); // Ano atual

      const todasAlteracoes = await alteracao.findAll();
      const historicoDoMesAtual = todasAlteracoes.filter(alteracaoA => {
      const data = new Date(alteracaoA.data_alteracao);
      return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
      });
      res.json(historicoDoMesAtual);

    } catch (error) {
      console.error('Erro ao buscar o histórico de alterações:', error);
      res.status(500).json({ error: 'Erro ao buscar o histórico de alterações' });
    }
  });

  router.get('/historicoDiaEspecifico', async (req, res) => { 
    try {
      const {dateCalendario} = req.body;

      const diaAtual = new Date(dateCalendario);

      const todasAlteracoes = await alteracao.findAll();

      const historicoDoDia = todasAlteracoes.filter(alteracaoDia => {
      const dataX = new Date(alteracaoDia.data_alteracao);
      return   dataX.getUTCDate() === diaAtual.getUTCDate()
      });
      res.json(historicoDoDia);
    } catch (error) {
      console.error('Erro ao buscar o histórico de alterações:', error);
      res.status(500).json({ error: 'Erro ao buscar o histórico de alterações' });
    }
});

  export default router;
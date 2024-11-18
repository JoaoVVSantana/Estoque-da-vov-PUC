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

/// Apagar uma Alteracao por id
router.delete('/:id/apagarAlteracao', async (req, res) => {
  const { id_alteracao} = req.params;
  try {
    const objeto = await alteracao.findByPk(id_alteracao);
    const transaction = await database.transaction();

    await objeto.destroy({ transaction });
    await transaction.commit();

    res.json({ message: 'Alteração apagada: ', alteracao: id_alteracao });
  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao apagar alteracao: ', error);
    res.status(400).json({ error: error.message });
  }
});

  export default router;
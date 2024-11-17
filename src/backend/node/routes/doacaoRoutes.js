import {
  doador,
} from './../../packages.js';

import express from 'express';
const router = express.Router();


// REGISTRAR NOVO DOADOR
router.post('/registrarDoador', async (req, res) => { 
  const { nomeDoador,emailDoador } = req.body;

  // Validar se os dados fazem sentido 
  if (!emailDoador) {
    return res.status(400).json({ error: 'É necessário inserir um email' });
  }
  try {
    // Verifica se o doador já existe pelo email
    let doadorAtual = await doador.findOne({ where: { email: emailDoador } });

    // Se nao, cria
    if (!doadorAtual) {
      doadorAtual= doador.criarDoador(nomeDoador,emailDoador);
      res.status(201).json({ message: 'Doador registrado com sucesso', doadorAtual:nomeDoador });
    }
    else{
       return res.status(400).json({ error: 'O doador já está cadastrado' });
    }
  } catch (error) {
    console.error('Erro ao registrar doador: ', error);
    res.status(500).json({ error: 'Erro ao registrar doador ' });
  }
});

// LISTAR TODAS DOAÇÕES
router.get('/api/doacoes', async (req, res) => { 
  try {
    const doacoes = await doacao.findAll({
      include: [
        { model: doador, as: 'doador' },
        { model: item, as: 'item' }
      ]
    });
    res.json(doacoes);
  } catch (error) {
    console.error('Erro ao listar doações:', error);
    res.status(500).json({ error: 'Erro ao listar doações' });
  }
});
export default router;

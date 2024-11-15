import {
  doador,
} from './../../packages.js';

import express from 'express';
const router = express.Router();

// REGISTRAR NOVA DOAÇÃO
router.post('/api/estoque/registrarDoacao', async (req, res) => { 
    const { id_doador } = req.body;

    // Validar se os dados fazem sentido 
    if (!doacao) {
      return res.status(400).json({ error: ' ' });
    }
    try {
      // Verifica se o doador já existe pelo email
      let doadorAtual = await doador.findByPk(id_doador);
  
      // Se não, cria e coloca no banco
      if (!doadorAtual ) {
        doadorAtual = doador.criarDoador(nomeDoador,emailDoador);
      }
      // Cria o item que vai ser doado no banco
      let itemDoado = app.criarItem(nomeItem,quantidade,validade,doadorAtual.id_doador);
      
      // Cria um registro de doação
      const novaDoacao = app.criaDoacao(doadorAtual.id_doador,itemDoado.id_item,quantidade);
  
      res.status(201).json({ message: 'Doação registrada com sucesso', doacao: novaDoacao });
    } catch (error) {
      console.error('Erro ao registrar doação:', error);
      res.status(500).json({ error: 'Erro ao registrar doação' });
    }
});

// REGISTRAR NOVO DOADOR
router.post('/api/estoque/registrarDoador', async (req, res) => { 
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
      res.status(201).json({ message: 'Doação registrada com sucesso', doadorAtual:nomeDoador });
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

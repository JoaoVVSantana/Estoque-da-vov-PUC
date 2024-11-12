// src/routes/doacaoRoutes.js
const express = require('express');
const estoque = require('../tabelas/estoque'); // Modelo de estoque, que contém métodos de criação
const doador = require('../tabelas/doador'); // Modelo de doador
const item = require('../tabelas/item'); // Modelo de item

const router = express.Router();

// REGISTRAR NOVA DOAÇÃO
router.post('/api/estoque/inserir_doacao', async (req, res) => { 
    const { nomeDoador, emailDoador, nomeItem, quantidade, validade } = req.body;

    // Validar se os dados fazem sentido 
    if (!nomeDoador|| !emailDoador || !quantidade || !nomeItem || !validade) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome do doador, email do Doador, nome do item, quantidade, validade ' });
    }
    try {
      // Verifica se o doador já existe pelo email
      let doadorAtual = await doador.findOne({ where: { email: emailDoador } });
  
      // Se não, cria e coloca no banco
      if (!doadorAtual ) {
        doadorAtual =app.criarDoador(nomeDoador,emailDoador);
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

// LISTAR TODAS DOAÇÕES
router.get('/api/doacoes', async (req, res) => { 
  try {
    const doacoes = await Doacao.findAll({
      include: [
        { model: Doador, as: 'doador' },
        { model: Item, as: 'item' }
      ]
    });
    res.json(doacoes);
  } catch (error) {
    console.error('Erro ao listar doações:', error);
    res.status(500).json({ error: 'Erro ao listar doações' });
  }
});

module.exports = router;

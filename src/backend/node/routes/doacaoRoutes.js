import {
  doador,
  
} from './../../packages.js';
import axios from 'axios';
import express from 'express';
const router = express.Router();


// REGISTRAR NOVO DOADOR (com Email)
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
      doadorAtual= doador.create({nome:nomeDoador, email:emailDoador, id_estoque:1});
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

// REGISTRAR DOACAO (Mesmo que o doador nao seja cadastrado, pede o nome)
router.post('/registrarDoacao', async (req, res) => { 
  const { nomeCompletoDoador, nomeItem, validade, tipo } = req.body; // Incluindo informações do item

  // Validação de dados
  if (!nomeCompletoDoador || !nomeItem || !validade || !tipo) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nomeCompletoDoador, nomeItem, validade, tipo' });
  }

  try {
    // Verifica se o doador já existe pelo nome
    let doadorAtual = await doador.findOne({ where: { nome: nomeCompletoDoador } });

    // Se não, cria o doador
    if (!doadorAtual) {
      doadorAtual = await doador.create({ nome: nomeCompletoDoador, email: null,id_estoque:1 });
    }
  

    // Chama a API de inserir um item
    const response = await axios.post('http://localhost:5000/api/estoque//inserirItemDoacao', {
      nome: nomeItem,
      validade,
      tipo,
      id_doador:doadorAtual.id_doador,
    });
    
    if (response.status === 200) {
      
      await doador.atualizarItensDoados(doadorAtual);
      res.status(201).json({
        message: 'Doação registrada com sucesso!',
        doador: doadorAtual.nome,
        item: response.data.item,
      });
      
    } else {
      throw new Error('Erro ao inserir o item no estoque.');
    }
    
  } catch (error) {
    console.error('Erro ao registrar doador: ', error);
    res.status(500).json({ error: 'Erro ao registrar doador ' });
  }
});

// LISTAR TODAS DOAÇÕES
router.get('/doacoes', async (req, res) => { 
  try {
    const itensDeDoacoes = await item.findAll({where:item.id_doador!=null});
    res.json(itensDeDoacoes);
  } catch (error) {
    console.error('Erro ao listar doações:', error);
    res.status(500).json({ error: 'Erro ao listar doações' });
  }
});


// LISTAR TODOS DOADORES
router.get('/doadores', async (req, res) => { 
  try {
    const doadores = await doador.findAll();
    res.json(doadores);
  } catch (error) {
    console.error('Erro ao listar doadores: ', error);
    res.status(500).json({ error: 'Erro ao listar doadores ' });
  }
});
export default router;

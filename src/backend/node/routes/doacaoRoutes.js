import {
  doador,
  item
} from './../../packages.js';
import axios from 'axios';
import autenticarToken from '../../middlewares/autenticarToken.js';
import express from 'express';
const router = express.Router();

// REGISTRAR NOVO DOADOR (com Email)
router.post('/registrarDoador', async (req, res) => { 
  const { nomeCompletoDoador,emailDoador } = req.body;
  
  // Validar se os dados fazem sentido 
  if (!emailDoador) {
    return res.status(400).json({ error: 'É necessário inserir um email' });
  }
  try {
    // Verifica se o doador já existe pelo nome
    let doadorAtual = await doador.findOne({ where: { nome: nomeCompletoDoador } });

    // Se nao, cria
    if (!doadorAtual) {
      doadorAtual= doador.create({nome:nomeCompletoDoador, email:emailDoador, id_estoque:1});
      res.status(201).json({ message: 'Doador registrado com sucesso', doadorAtual:nomeCompletoDoador });
    }
    else{
      if(doadorAtual && doadorAtual.emailDoador == null)
      {
        await doador.atualizarEmail(doadorAtual,emailDoador);
        return res.status(400).json({ error: 'O doador já está cadastrado, email atualizado' });
      }
       return res.status(400).json({ error: 'O doador já está cadastrado' });
    }
  } catch (error) {
    console.error('Erro ao registrar doador: ', error);
    res.status(500).json({ error: 'Erro ao registrar doador ' });
  }
});

// LISTAR TODOS ITENS DE DOAÇÕES
router.get('/todosItensDeDoacoes', async (req, res) => { 
  try {
    const itens = await item.buscarItensDoacao();
    console.log(itens);
    res.status(200).json({
      message: 'Itens que foram doados: ',
      itens,
    });
  } catch (error) {
    console.error('Erro ao listar doações:', error);
    res.status(500).json({ error: 'Erro ao listar doações' });
  }
});

// LISTAR TODOS DOADORES
router.get('/doadores', async (req, res) => { 
  try {
    const doadores = await doador.findAll();
    res.status(200).json(doadores);
  } catch (error) {
    console.error('Erro ao listar doadores: ', error);
    res.status(500).json({ error: 'Erro ao listar doadores ' });
  }
});

/// Apagar um Doador por id
router.delete('/:id/apagarDoador', async (req, res) => {
  const { id_doador} = req.params;
  try {
    const objeto = await doador.findByPk(id_doador);
    const transaction = await database.transaction();

    await objeto.destroy({ transaction });
    await transaction.commit();

    res.json({ message: 'Doador removido: ', objeto });
  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao apagar doador: ', error);
    res.status(400).json({ error: error.message });
  }
});

// REGISTRAR DOACAO (Mesmo que o doador nao seja cadastrado, pede o nome)
router.post('/registrarDoacao', async (req, res) => { 
  const { nomeCompletoDoador, nomeItem, validade, tipo, quantidade, id_lote } = req.body; // Incluindo informações do item

  // Validação de dados
  if (!nomeCompletoDoador || !nomeItem || !validade || !tipo || !quantidade || !id_lote) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nomeCompletoDoador, nomeItem, validade, tipo, quantidade e id do lote' });
  }

  try {
    // Verifica se o doador já existe pelo nome
    let doadorAtual = await doador.findOne({ where: { nome: nomeCompletoDoador } });

    // Se não, cria o doador
    if (!doadorAtual) {
      doadorAtual = await doador.create({ nome: nomeCompletoDoador, email: null,id_estoque:1 });
    }
    // Chama a API de inserir um item
    const response = await axios.post('http://localhost:5000/api/estoque//inserirItem', {
      nome: nomeItem,
      validade,
      tipo,
      quantidade,
      id_doador:doadorAtual.id_doador,
      id_lote
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

// #endregion

export default router;
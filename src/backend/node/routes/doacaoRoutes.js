import {
  doador,
  item
} from './../../packages.js';
import axios from 'axios';
import autenticarToken from '../../middlewares/autenticarToken.js';
import express from 'express';
import database from '../../db/database.js';
const router = express.Router();

// REGISTRAR NOVO DOADOR (com contato)
router.post('/registrarDoador', async (req, res) => { 
  const { nomeCompletoDoador,contatoDoador } = req.body;
  
  // Validar se os dados fazem sentido / OBS??? Pela logica do projeto era para ser opcional, além do registrar doação criar doador sem contato
  /*if (!contatoDoador) {
    return res.status(400).json({ error: 'É necessário inserir um contato' });
  }*/
  try {
    // Verifica se o doador já existe pelo nome
    let doadorAtual = await doador.findOne({ where: { nome: nomeCompletoDoador } });

    // Se nao, cria
    if (!doadorAtual) {
      doadorAtual= doador.create({nome:nomeCompletoDoador, contato:contatoDoador, id_estoque:1});
      res.status(201).json({ message: 'Doador registrado com sucesso', doadorAtual:nomeCompletoDoador });
    }
    else{
      if(doadorAtual && doadorAtual.contatoDoador == null)
      {
        await doador.atualizarContato(doadorAtual,contatoDoador);
        return res.status(400).json({ error: 'O doador já está cadastrado, contato atualizado' });
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

/// Apagar um Doador por id  // obs: corrigido bug
router.delete('/:id/apagarDoador', async (req, res) => {
  const {id} = req.params;
  try {
    const objeto = await doador.findByPk(id);
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
      doadorAtual = await doador.create({ nome: nomeCompletoDoador, contato: null,id_estoque:1 });
    }
    // Chama a API de inserir um item
    const response = await axios.post('http://localhost:5000/api/estoque/inserirItem', {
      nome: nomeItem,
      validade,
      tipo,
      quantidade:parseInt(quantidade),
      id_doador:doadorAtual.id_doador,
      id_lote
    });
    
    if (response.status === 200) {
      await doador.atualizarItensDoados(doadorAtual, quantidade);
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

// ATUALIZAR NOME OU contato DO DOADOR
router.put('/:id/atualizarDoador', async (req, res) => {
  const { id } = req.params; // ID do doador na rota
  const { nome, contato } = req.body; // Novos valores no corpo da requisição

  try {
    // Valida se ao menos um campo foi passado
    if (!nome && !contato) {
      return res.status(400).json({ error: 'Informe pelo menos o nome ou o contato para atualizar.' });
    }

    // Busca o doador pelo ID
    const doadorAtual = await doador.findByPk(id);

    if (!doadorAtual) {
      return res.status(404).json({ error: 'Doador não encontrado.' });
    }

    // Atualiza os dados apenas se foram informados
    if (nome) doadorAtual.nome = nome;
    if (contato) doadorAtual.contato = contato;

    // Salva as alterações no banco de dados
    await doadorAtual.save();

    res.status(200).json({
      message: 'Doador atualizado com sucesso.',
      doador: doadorAtual,
    });
  } catch (error) {
    console.error('Erro ao atualizar doador: ', error);
    res.status(500).json({ error: 'Erro ao atualizar doador.' });
  }
});

// PEGAR DOADOR ESPECÍFICO PELO ID
router.get('/:id/doador', async (req, res) => {
  const { id } = req.params; // ID do doador passado na URL

  try {
    // Busca o doador pelo ID no banco de dados
    const doadorAtual = await doador.findByPk(id);

    // Verifica se o doador foi encontrado
    if (!doadorAtual) {
      return res.status(404).json({ error: 'Doador não encontrado.' });
    }

    // Retorna as informações do doador encontrado
    res.status(200).json({
      message: 'Doador encontrado com sucesso.',
      doador: doadorAtual,
    });
  } catch (error) {
    console.error('Erro ao buscar doador:', error);
    res.status(500).json({ error: 'Erro ao buscar informações do doador.' });
  }
});



// #endregion

export default router;

const express = require('express');
const sequelize = require('./database');
const estoque = require('./estoque');

const app = express();
const PORT = 3000;


sequelize.authenticate() // Conexão com BD
  .then(() => console.log('Conectado ao BD com sucesso.'))
  .catch((err) => console.error('Não foi possível conectar ao banco de dados:', err));

sequelize.sync(); // Sincronizar com o banco




// REGISTRAR ITEM NO BANCO
app.post('/api/itens', autenticarToken, async (req, res) => {
  const { nome, quantidade, validade, id_estoque } = req.body;

  try {
    // Validar se os dados fazem sentido 
    if (!nome || !quantidade || !validade || !id_estoque) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, quantidade, validade, id_estoque' });
    }

    // Cria um novo item no banco de dados
    let novoItem = estoque.criarItem(nome,quantidade,validade,id_doador)

    // Retorna o item recém-criado como resposta
    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao registrar item:', error);
    res.status(500).json({ error: 'Erro ao registrar o item' });
  }
});

// REGISTRAR DOAÇÃO
app.post('/api/doacoes', autenticarToken, async (req, res) => {
  
  const { nomeDoador, emailDoador, nomeItem, quantidade, validade } = req.body;

  // Validar se os dados fazem sentido 
  if (!nomeDoador|| !emailDoador || !quantidade || !nomeItem || !validade) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome do doador, email do Doador, nome do item, quantidade, validade ' });
  }
  try {
    // Verifica se o doador já existe pelo email
    let doadorExistente = await doador.findOne({ where: { email: emailDoador } });

    // Se não, cria e coloca no banco
    if (!doadorExistente) {
      app.criarDoador(nomeDoador,emailDoador);
    }
    // Verifica se o item já existe no banco de dados e está vinculado ao doador
    let itemDoado = await item.findOne({ where: { nome: nomeItem, validade, id_doador: doadorExistente.id_doador } });
    if(!itemDoado)
    {
      app.criarItem(nomeItem,quantidade,validade,doadorExistente.id_doador)
    }
      


    // Cria um registro de doação
    const novaDoacao = await doacao.create({
      id_doador: doadorExistente.id_doador,
      id_item: itemDoado.id_item,
      quantidade,
      data_doacao: new Date(),
    });

    res.status(201).json({ message: 'Doação registrada com sucesso', doacao: novaDoacao });
  } catch (error) {
    console.error('Erro ao registrar doação:', error);
    res.status(500).json({ error: 'Erro ao registrar doação' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// TODOS OS ITENS REGISTRADOS
app.get('/api/itens', async (req, res) => { 
    try {
      const itens = await itens.findAll(); // Consulta ao bd
      res.json(itens); // Retorna  em JSON
    } catch (error) {
      console.error('Erro ao buscar itens: ', error);
      res.status(500).json({ error: 'Erro ao buscar itens ' });
    }
  });
  
  // CONSULTAR ITEM POR ID
  app.get('/api/itens/:id', async (req, res) => { 
    try {
      const id = req.params.id;
      const itemEncontrado = await item.findByPk(id); // Busca no estoque
      if (itemEncontrado) {
        res.json(itemEncontrado);// Retorna  em JSON
      } else {
        res.status(404).json({ error: 'Item não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar item: ', error);
      res.status(500).json({ error: ' Erro ao buscar item ' });
    }
  });

// RETIRAR DO ESTOQUE 
app.post('/api/estoques/:id_estoque/retirada', autenticarToken, async (req, res) => { 
  const { id_estoque } = req.params;
  const { itemId, quantidade } = req.body;

  // Verifica se o estoque existe
  try { 
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    //Se existir >
    const itemAtualizado = await estoqueEncontrado.retirarItem(itemId, quantidade); // Usa a função async da classe do estoque pra lógica
    res.json({ message: 'Retirada realizada com sucesso', item: itemAtualizado });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

// INSERIR NO ESTOQUE
app.post('/api/estoques/:id_estoque/retirada', autenticarToken, async (req, res) => { 
  const { id_estoque } = req.params;
  const { itemId, quantidade } = req.body;

  // Verifica se o estoque existe
  try {
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
  //Se existir >
    const itemAtualizado = await estoqueEncontrado.retirarItem(itemId, quantidade); // Usa a função async da classe do estoque pra lógica
    res.json({ message: 'Retirada realizada com sucesso', item: itemAtualizado });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

// VISUALIZAR HISTORICO DE ALTERACOES
app.get('/api/historico', autenticarToken, async (req, res) => { 
  try {
    const historicoCompleto = await historico.findAll({include: [{ model: alteracao, as: 'alteracoes' }] });

    res.json(historicoCompleto);
  } catch (error) {
    console.error('Erro ao buscar o histórico de alterações:', error);
    res.status(500).json({ error: 'Erro ao buscar o histórico de alterações' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`); // Iniciar o servidor
});

app.criarDoador = async function (nome,email) {
  const doadorNovo = await doador.create({
    nome: nome,
    email: email,
  });
}
app.criarItem = async function(nome,quantidade,validade,id_doador) {
  const novoItem = await item.create({
    nome,
    quantidade,
    validade,
    id_estoque,
    id_doador,
  });
  return novoItem;
}
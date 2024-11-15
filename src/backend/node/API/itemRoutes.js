import {
  router,
  autenticarToken,
  estoque,
  item
} from 'src/packages';

// Criar um novo item NO BANCO DE DADOS, NÃO É PARA INSERIR NO ESTOQUE.
router.post('/', async (req, res) => {
  const { nome, validade, tipo} = req.body;

  try {
    const novoItem = await item.create({nome,validade,tipo});
    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({ error: 'Erro ao criar item' });
  }
});

// Listar todos os itens QUE ESTÃO NO BANCO DE DADOS, NÃO NO ESTOQUE
router.get('/', async (req, res) => {

  try {
    const itens = await item.findAll();
    res.json(itens);
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({ error: 'Erro ao listar itens' });
  }
});

// INSERIR NO ESTOQUE
router.post('/api/estoques/:id_estoque/inserir', autenticarToken, async (req, res) => { 
  const { id_estoque } = req.params;
  const {  id_item,validade } = req.body;

  // Verifica se o estoque existe
  try {
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
  //Se existir >
    const itemAtualizado = await estoqueEncontrado.inserirItemNoEstoque(nome, validade,tipo, quantidade); // Usa a função async da classe do estoque pra lógica
    res.json({ message: 'Item inserido com sucesso', item: itemAtualizado });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

//RETIRAR DO ESTOQUE
router.post('/api/estoques/:id_estoque/retirada', autenticarToken, async (req, res) => { 
  const { id_estoque } = req.params;
  const { nome, quantidade } = req.body;

  // Verifica se o estoque existe
  try { 
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    //Se existir >
    const itemAtualizado = await estoqueEncontrado.retirarItem(nome, quantidade); // Usa a função async da classe do estoque pra lógica
    res.json({ message: 'Retirada realizada com sucesso', item: itemAtualizado });
  } catch (error) {
    console.error('Erro ao processar a retirada:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

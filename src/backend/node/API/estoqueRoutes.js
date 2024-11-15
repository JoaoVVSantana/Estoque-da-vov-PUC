import {
  router,
  autenticarToken,
  estoque
} from 'src/packages';

// RETIRAR DO ESTOQUE 
router.post('/api/estoque/item/inserir', autenticarToken, async (req, res) => { 
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
router.post('/api/estoque/item/remover', autenticarToken, async (req, res) => { 
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

// RELATÓRIO DE ITENS EM FALTA NO ESTOQUE
router.get('/api/estoque/itemsFaltando', autenticarToken, async (req,res) => {
  const { id_estoque } = req.params;

  // Verifica se o estoque existe
  try {
    const estoqueEncontrado = await estoque.findByPk(id_estoque); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
  //Se existir >
    
  // TERMINAR AQUI ***************************
  } catch (error) {
    console.error('Erro ao processar o relatório:', error);
    res.status(400).json({ error: error.message });
  }
});
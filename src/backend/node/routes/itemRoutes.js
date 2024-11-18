import {
  //autenticarToken,
  estoque,
  item
} from './../../packages.js';

import express from 'express';
const router = express.Router();

// Criar alertas se tem itens perto da data de vencimento.
router.get('/itensPertoDoVencimento', async (req, res) => {
  try {
    const estoqueEncontrado = await estoque.findByPk(1); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    const alertas= await item.todosItensPertoDoVencimento();
    if(alertas!=null)
    {
      res.json({
        message: 'Alertas criados com sucesso!',
        alertas: alertas.map(alerta => ({
          conteudo: alerta.conteudo,
          motivo: alerta.motivo,
          dataCriacao: alerta.data_criacao, 
          itemId: alerta.id_item,    
        }))
      });
    }
    else
    {
      res.json({
        message: 'Nenhum item perto do vencimento, nenhum alerta criado.',
      });
      
    }      
  } catch (error) {
    console.error('Erro ao criar Alertas', error);
    res.status(500).json({ error: 'Erro ao criar Alertas' });
  }
});

// Mostra os itens que estão vencidos no estoque
router.get('/itensVencidos', async (req, res) => {
  try {
    const estoqueEncontrado = await estoque.findByPk(1); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    const itensVencidos= await item.itensVencidos();
    if(itensVencidos==null)
    {
      res.json({
        message: 'Nenhum item vencido no estoque',
      });
    }
    else
    {
      res.json({
        message: 'Estes itens estão vencidos, identefique e descarte-os imediatamente!: ',
        itensVencidos: itensVencidos.map(item => ({
          id_item:item.id_item,
          nome:item.nome,
          validade: item.validade,
        }))
      });
    }      
  } catch (error) {
    console.error('Erro ao criar Alertas', error);
    res.status(500).json({ error: 'Erro ao criar Alertas' });
  }
});



export default router;
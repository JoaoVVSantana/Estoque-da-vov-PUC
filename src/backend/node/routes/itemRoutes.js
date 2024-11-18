import {
  //autenticarToken,
  //estoque,
  //item
} from './../../packages.js';
import{estoque,item, alerta} from '../tabelas/relacionamentos.js';
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
    if(alertas==null)
    {
      res.json({
        message: 'Nenhum item perto do vencimento, nenhum alerta criado.',
      });
    }
    else
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
  } catch (error) {
    console.error('Erro ao criar Alertas', error);
    res.status(500).json({ error: 'Erro ao criar Alertas' });
  }
});



export default router;
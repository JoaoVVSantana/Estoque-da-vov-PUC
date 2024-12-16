import {
  //autenticarToken,
  estoque,
  loteDeItens,
  item
} from './../../packages.js';
import autenticarToken from '../../middlewares/autenticarToken.js';
import formatarData from '../utils/formatarData.js';
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
    if(alertas)
    {
      res.status(200).json({
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
    const alertasItensVencidos= await item.itensVencidos();
    if(alertasItensVencidos.length === 0)
    {
      res.status(200).json({
        message: 'Nenhum item vencido no estoque',
      });
    }
    else
    {
      res.status(200).json({
        message: 'Estes itens estão vencidos, identefique e descarte-os imediatamente!: ',
        alertas: alertasItensVencidos.map(alerta => ({
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


router.get('/lotesComPoucosItens', async (req, res) => {
  try {
    const estoqueEncontrado = await estoque.findByPk(1); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    const lotes = await loteDeItens.emBaixaQuantidade();
    
    if(lotes!=null)
    {
      res.status(200).json({
        message: 'Lotes com poucos itens: ',
        lotes: lotes.map(loteA => ({
          nome: loteA.nome,
          quantidade: loteA.quantidade,
          
        }))
      });
    }
    else
    {
      res.status(404).json({
        message: 'Nenhum lote com menos de 5 itens',
      });
      
    }      
  } catch (error) {
    console.error('Erro ao criar Alertas', error);
    res.status(500).json({ error: 'Erro ao criar Alertas' });
  }
});

router.get('/lotesVazios', async (req, res) => {
  try {
    const estoqueEncontrado = await estoque.findByPk(1); 
    if (!estoqueEncontrado) {
      return res.status(404).json({ error: 'Estoque não encontrado' });
    }
    const lotes = await loteDeItens.semItens();
    if(lotes!=null)
    {
      res.status(200).json({
        message: 'Lotes vazios: ',
        lotes: lotes.map(loteA => ({
          nome: loteA.nome,
          
        }))
      });
    }
    else
    {
      res.status(404).json({
        message: 'Nenhum lote vazio',
      });
      
    }      
  } catch (error) {
    console.error('Erro ao criar Alertas', error);
    res.status(500).json({ error: 'Erro ao criar Alertas' });
  }
});

export default router;
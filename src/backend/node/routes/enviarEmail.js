import {
  //autenticarToken
  item,
} from '../../packages.js';

import nodemailer from 'nodemailer';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config('../../.env');
const router = express.Router();

router.post('/pedirDoacao', async (req,res) => {
  const {nomeDoador, emailDoador} = req.body;
  
  try {
    await enviarEmail(emailDoador,nomeDoador);
    res.status(201).json({ error: 'Email enviado para: ',emailDoador });
  } catch (error) {
    console.error('Erro ao enviar Email', error);
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
});

async function criaTextoDeDoacao(nomeDoador) 
{
  let mensagem = `Prezado doador ${nomeDoador}, esperamos que esteja bem! \n`;
  mensagem+= `Nós do lar da Vovó estamos precisando de sua ajuda mais uma vez. Caso tenha interesse em contribuir novamente com a nossa instituição, estes são os itens que mais estão em falta: \n`;

  const itensEmBaixa = await item.todosItensEmBaixaQuantidade();
  itensEmBaixa.forEach((item) => {
    mensagem+=`-- ${item.nome} --\n`;
  });
  mensagem+=`Obrigado! `;
  return mensagem;

}

async function enviarEmail( enderecoEmailDoador, nomeDoador) {
const assunto ='O Lar da Vovó precisa da sua ajuda!'; 
const mensagem = await criaTextoDeDoacao(nomeDoador);

  try {
    console.log('SMTP_SERVER:', process.env.SMTP_SERVER);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_SENHA:', process.env.EMAIL_SENHA);

    // Configuração do transporte SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT || 587,
      secure: false, // Use TLS explícito
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_SENHA,
      },
    });

    const isConnected = await transporter.verify();
    console.log('Conexão SMTP bem-sucedida:', isConnected);
    console.log('Tipo do transporter:', typeof transporter);

    
    // Configuração do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: enderecoEmailDoador, 
      subject: assunto, // Tópico do email (em cima)
      text: mensagem, // Conteúdo do email em texto
    };

    // Envia o e-mail
    console.log('Tipo do transporter:', typeof transporter);

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

//Enviar email pro doador com um texto pronto e os itens que estão faltando no estoque

export default router;
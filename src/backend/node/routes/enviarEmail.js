import {
  //autenticarToken
  loteDeItens,
  doador
} from '../../packages.js';
import autenticarToken from '../../middlewares/autenticarToken.js';
import nodemailer from 'nodemailer';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config('../../.env');
const router = express.Router();

router.get('/pedirDoacao', async (req,res) => {
  const {id_doador} = req.body;
  const doadorA = await doador.findByPk(id_doador);
  if(doadorA.email==null) res.status(500).json({ error: 'Este doador não possui email registrado' });
  try {
    await enviarEmail(doadorA.email,doadorA.nome);
    res.status(201).json({ status: 'Email enviado para: ',doadorA });
  } catch (error) {
    console.error('Erro ao enviar Email', error);
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
});

async function criaTextoDeDoacao(nomeDoador) 
{
  let mensagem = `Prezado doador ${nomeDoador}, esperamos que esteja bem! \n`;
  mensagem+= `Nós do Lar da Vovó estamos precisando de sua ajuda mais uma vez. Caso tenha interesse em contribuir novamente com a nossa instituição, estes são os itens que mais fazem falta: \n`;

  const lotes = await loteDeItens.emBaixaQuantidade();
  
  lotes.forEach((lote) => {
    mensagem+=`-- ${lote.nome} --\n`;
  });
  mensagem+=`Agradecemos imensamente por sua conbribuição e preocupação com nossas idosas! `;
  return mensagem;

}

async function enviarEmail( enderecoEmailDoador, nomeDoador) {
const assunto ='O Lar da Vovó precisa da sua ajuda!'; 
const mensagem = await criaTextoDeDoacao(nomeDoador);

  try {
    console.log('SMTP_SERVER:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_SENHA:', process.env.EMAIL_PASSWORD);

    // Configuração do transporte SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false, // Use TLS explícito
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const isConnected = await transporter.verify();
    if(!isConnected) return console.error('Erro ao enviar e-mail:', error);
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
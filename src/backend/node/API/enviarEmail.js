import {
  autenticarToken
} from './../../packages.js';

const nodemailer = require('nodemailer');
import express from 'express';
const router = express.Router();

router.post('/api/estoque/pedirDoacao', autenticarToken, async (req,res) => {
  const {id_doador} = req.params;
  const {nomeDoador, enderecoEmailDoador} = req.body;

  
  try {
    enviarEmail(enderecoEmailDoador,nomeDoador);
    res.status(201).json(novoItem);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({ error: 'Erro ao enviar email' });
  }


});


async function criaTextoDeDoacao(nomeDoador) {

  let mensagem = `Prezado doador${nomeDoador}, esperamos que esteja bem! \n`;
  mensagem+= `Nós do lar
  da Vovó estamos precisando de sua ajuda mais uma vez, caso tenha interesse em contribuir novamente
  com a nossa instituição, estes são os itens que mais estão em falta: \n`;
  const itensEmBaixa = await item.todosItensEmBaixaQuantidade();

  itensEmBaixa.forEach((item) => {
    mensagem+=`- ${item.nome}\n`;
  });

  return mensagem;


}

async function enviarEmail( enderecoEmailDoador, mensagem) {
const assunto ='O Lar da Vovó precisa da sua ajuda!'; 
const mensagem = criaTextoDeDoacao();

  try {
    // Configuração do transporte SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com', // Servidor SMTP
      port: 587, // Porta SMTP
      secure: true, // Usar SSL
      auth: {
        user: 'lardavovo@hotmail.com', // Esse é o email que tava no site deles, n sei se é o que vão usar
        pass: 'sua_senha_de_email', // Pedir a senha pra eles ou fazer autenticação com a api
      },
    });

    // Configuração do e-mail
    const mailOptions = {
      from: 'lardavovo@hotmail.com',
      to: enderecoEmailDoador, 
      subject: assunto, // Tópico do email (em cima)
      text: mensagem, // Conteúdo do email em texto
    };

    // Envia o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}



//Enviar email pro doador com um texto pronto e os itens que estão faltando no estoque

export default router;
import {
  router
} from 'src/packages';

const nodemailer = require('nodemailer');


router.post('/api/estoque/pedirDoacao', autenticarToken, async (req,res) => {
  const {id_doador} = req.params;
  const {nomeDoador, enderecoEmailDoador} = req.body;

  const criaMensagem = criaTextoDeDoacao(nomeDoador);



});

async function criaTextoDeDoacao(nomeDoador) {

  const mensagem = '';
}

async function enviarEmail( enderecoEmailDoador, mensagem) {
const assunto ='Pedido de doação lar da vovó'; 
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


import cron from 'node-cron';
import axios from 'axios';

//configurar na próxima sprint
cron.schedule('0 0 */14 * *', async () => { // Executa a cada 14 dias
  console.log('Executando rotina de verificação de itens perto do vencimento.');
  try {
    const response = await axios.get('http://localhost:5000/api/itensPertoDoVencimento'); // Essa é a API que roda o banco procurando os itens que estão vencendo

    console.log(response.data);

  } catch (error) {
    console.error('Erro na rotina de itens perto do vencimento: ', error.message);
  }
});

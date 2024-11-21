import cron from 'node-cron';
import axios from 'axios';

// Ver com a gerente qual o melhor perído de tempo pra rodar a rotina
cron.schedule('0 0 */14 * *', async () => { // Executa a cada 14 dias
  console.log('Executando rotina de verificação de itens perto do vencimento.');
  try {
    const response = await axios.get('http://localhost:5000/api/estoque/itensFaltando'); 
    // Esse é o endpoint que retorna todos os produtos em baixa quantidade no estoque

    console.log(response.data);

  } catch (error) {
    console.error('Erro na rotina de itens em baixa quantidade no estoque: ', error.message);
  }
});

export default cron.schedule();
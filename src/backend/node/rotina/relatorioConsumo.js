import cron from 'node-cron';
import axios from 'axios';

// Ver com a gerente qual o melhor perído de tempo pra rodar a rotina
cron.schedule('0 0 */7 * *', async () => { // Executa a cada 7 dias
  console.log('Executando rotina de geração de relatório de consumo. ');
  try {
    const response = await axios.get('http://localhost:5000/api/alteracoes/relatorioDeConsumo'); 
    // Essa é a API que roda o banco procurando os itens que estão vencendo
    const data ={ 
      dataInicioRaw:new data(),
      dataFimRaw: new data(), 
    }
    console.log(response.data);

  } catch (error) {
    console.error('Erro na rotina de consumo: ', error.message);
  }
});

export default cron.schedule();
export const formatDate = (dataISO) => {
    const data = new Date(dataISO); // Converte a string ISO para objeto Date
  
    // Extrai os valores de dia, mês e ano
    const dia = String(data.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
    const ano = String(data.getFullYear()).slice(2); // Pega os últimos dois dígitos do ano
  
    return `${dia}/${mes}/${ano}`; // Formata a data como dd/mm/aa
  };
  
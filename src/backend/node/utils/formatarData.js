async function formatarData(data) {
    const dataObj = new Date(data);
    dataObj.setDate(dataObj.getDate() + 1);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }
export default formatarData;
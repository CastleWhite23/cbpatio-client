import { format } from "date-fns"
export  function getData(data, minutesDifference, method) {
    let novaData = data ? new Date(data) : new Date();
    if(data){
         novaData.setHours(novaData.getHours() + 3);
    }
    
    if (method == 'sum') {
        novaData.setUTCMinutes(novaData.getUTCMinutes() + 10);
    } else if (method === 'sub') {
        novaData.setUTCMinutes(novaData.getUTCMinutes() - 10);

    }
    const day = String(novaData.getDate()).padStart(2, '0');
    const month = String(novaData.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
    const year = novaData.getFullYear();
    
    const hours = String(novaData.getHours()).padStart(2, '0');
    const minutes = String(novaData.getUTCMinutes()).padStart(2, '0');
    const seconds = String(novaData.getUTCSeconds()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const formataData = (data) => {

    const data1 = new Date(data) // Extraindo cada parte da data
    const ano = data1.getUTCFullYear(); // Obtém o ano (UTC)
    const mes = data1.getUTCMonth() ; // Obtém o mês (UTC). Lembrando que janeiro é 0, então é necessário adicionar 1.
    const dia = data1.getUTCDate(); // Obtém o dia do mês (UTC)
    const hora = data1.getUTCHours(); // Obtém a hora (UTC)
    const minuto = data1.getUTCMinutes(); // Obtém os minutos (UTC)
    const segundo = data1.getUTCSeconds(); // Obtém os segundos (UTC)
    const milissegundo = data1.getUTCMilliseconds(); // Obtém os milissegundos (UTC)
    const dataLocal = new Date(ano, mes, dia, hora, minuto, segundo, milissegundo);
    return format(dataLocal, "dd/MM/yyyy")
}



export const formataHora = (data) => {

    const data1 = new Date(data) // Extraindo cada parte da data
    const ano = data1.getUTCFullYear(); // Obtém o ano (UTC)
    const mes = data1.getUTCMonth() + 1; // Obtém o mês (UTC). Lembrando que janeiro é 0, então é necessário adicionar 1.
    const dia = data1.getUTCDate(); // Obtém o dia do mês (UTC)
    const hora = data1.getUTCHours(); // Obtém a hora (UTC)
    const minuto = data1.getUTCMinutes(); // Obtém os minutos (UTC)
    const segundo = data1.getUTCSeconds(); // Obtém os segundos (UTC)
    const milissegundo = data1.getUTCMilliseconds(); // Obtém os milissegundos (UTC)
    const dataLocal = new Date(ano, mes, dia, hora, minuto, segundo, milissegundo);
    return format(dataLocal, "HH:mm")
}
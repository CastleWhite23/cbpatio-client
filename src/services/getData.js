import {format} from "date-fns"

export const getData = () =>{

    const dataAtual = new Date();

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; // Os meses começam do zero, então você precisa adicionar 1
    const dia = dataAtual.getDate();
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();
    const segundo = dataAtual.getSeconds();
    const dataCriacao = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
    
    return dataCriacao;
}


export const formataData = (data) =>{

    const data1 = new Date(data) // Extraindo cada parte da data
    const ano = data1.getUTCFullYear(); // Obtém o ano (UTC)
    const mes = data1.getUTCMonth() + 1; // Obtém o mês (UTC). Lembrando que janeiro é 0, então é necessário adicionar 1.
    const dia = data1.getUTCDate(); // Obtém o dia do mês (UTC)
    const hora = data1.getUTCHours(); // Obtém a hora (UTC)
    const minuto = data1.getUTCMinutes(); // Obtém os minutos (UTC)
    const segundo = data1.getUTCSeconds(); // Obtém os segundos (UTC)
    const milissegundo = data1.getUTCMilliseconds(); // Obtém os milissegundos (UTC)
    const dataLocal = new Date(ano, mes, dia, hora, minuto, segundo, milissegundo);
    return format(dataLocal, "dd/MM/yyyy")
}

export const formataHora = (data) =>{

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
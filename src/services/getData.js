
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

    const dataAtual = new Date(data);

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; // Os meses começam do zero, então você precisa adicionar 1
    const dia = dataAtual.getDate();
    const hora = dataAtual.getHours();
    const minuto = dataAtual.getMinutes();
    const segundo = dataAtual.getSeconds();
    let mesFinal = mes
    mes < 10 ? mesFinal = `0${mes}` : '';

    const dataCriacao = `${dia}/${mesFinal}/${ano}`;
    
    return dataCriacao;
}

export const formataHora = (data) =>{

    const dataAtual = new Date(data);

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; // Os meses começam do zero, então você precisa adicionar 1
    const dia = dataAtual.getDate();
    const hora = dataAtual.getHours();
    let minuto = dataAtual.getMinutes();
    minuto == 0 ? minuto = '00':'';
    const segundo = dataAtual.getSeconds();
    const dataCriacao = `${hora}:${minuto}`;
    
    return dataCriacao;
}
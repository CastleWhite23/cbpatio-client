import CryptoJS from "crypto-js"

function formatarNumero(numero = "") {
    // Remove todos os caracteres não numéricos do número
    var numeros = numero.replace(/\D/g, '');

    // Verifica se o número tem a quantidade correta de dígitos
    if (numeros.length !== 11) {
        return "Número de celular inválido";
    }

    // Formata o número
    var parte1 = numeros.slice(0, 2);
    var parte2 = numeros.slice(2, 7);
    var parte3 = numeros.slice(7);
    return "(" + parte1 + ") " + parte2 + "-" + parte3;
}

//jogar isso no .env daqui
const secretKey = "sexooooo";

function hashId(value) {
    const encryptedValue = CryptoJS.AES.encrypt(value?.toString(), secretKey).toString();
    return encodeURIComponent(encryptedValue);
}


function decodeHashId(encryptedValue) {
    const decodedValue = decodeURIComponent(encryptedValue);
    const bytes = CryptoJS.AES.decrypt(decodedValue, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);

}

function formataDinheiro(valor){
    const formata = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return formata.format(valor)
}



export {formatarNumero, hashId, decodeHashId, formataDinheiro}
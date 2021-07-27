class Editora {
    #connection;
    #validador;
    constructor(connection, validador) {
        this.#connection = connection;
        this.#validador = validador;
    }
    crieArtigo(urlArtigo, credencial) { }
    deleteArtigo(urlArtigo, credencial) { }
    editeArtigo(artigo, credencial) { }
}

function dataFormatadaMysql(data) {
    const dia = data.getDate().toString();
    const diaF = (dia.length == 1) ? '0' + dia : dia;
    const mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth() Janeiro começa com zero.
    const mesF = (mes.length == 1) ? '0' + mes : mes;
    const anoF = data.getFullYear();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundos = data.getSeconds();
    return anoF + "-" + mesF + "-" + diaF + " " + hora + ":" + minuto + ":" + segundos;
}
export default Editora;
class Editora {
    #connection;
    #validador;
    constructor(connection, validador) {
        this.#connection = connection;
        this.#validador = validador;
    }
    crieArtigo(urlArtigo, credencial) {
        return new Promise((resolve, reject) => {
            if (!this.#validador.credencial(credencial) && !this.#validador.urlArtigo(urlArtigo)) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#connection.query("CALL pro_crie_artigo(?,?);", [credencial, urlArtigo],
                    (err, results) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve();
                        }
                    });
            }
        });
    }
    deleteArtigo(urlArtigo, credencial) { }
    editeArtigo(url, artigo, credencial) {
        return new Promise((resolve, reject) => {
            if (!this.#validador.credencial(credencial) && !this.#validador.urlArtigo(url)) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#connection.query("CALL pro_edite_artigo(?, ?, ?, ?, ?);", [credencial, url, artigo.url, artigo.titulo, artigo.conteudo],
                    (err, results) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve();
                        }
                    });
            }
        });
    }
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
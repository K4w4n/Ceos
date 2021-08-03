class Biblioteca {
    #connection;
    #validador;
    constructor(connection, validador) {
        this.#connection = connection;
        this.#validador = validador;
    }
    pegueArtigo(callBack, idArtigo) {
        query('', [email, senha],
            (err, results, fields) => {

            });
    }
    resumaArtigo(callBack, idArtigo) {
        query('', [email, senha],
            (err, results, fields) => {

            });
    }
    meusArtigos(credencial) {
        return new Promise((resolve, reject) => {
            if (!this.#validador.credencial(credencial)) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#connection.query("CALL pro_pegue_meus_artigos(?);", [credencial],
                    (err, results) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve(results[0]);
                        }
                    });
            }
        });
    }
    resumaVariosArtigos(quantidadeArtigos, urlArtigo) {
        return new Promise((resolve, reject) => {
            if (!((!urlArtigo || this.#validador.urlArtigo(urlArtigo)) && this.#validador.stringENumero(quantidadeArtigos))) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#connection.query("CALL pro_resuma_varios_artigos(?, ?)", [quantidadeArtigos, urlArtigo || ''],
                    (err, results) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve(results[0]);
                        }
                    });
            }
        });
    }
}
export default Biblioteca;
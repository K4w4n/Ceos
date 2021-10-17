import { Select, Operation } from "./conectionMysql.js";
import Validador from "./validador.js";

const validador = new Validador();

class Biblioteca {
    constructor() {
    }
    async pegueArtigo(urlArtigo) {
        if (!validador.urlArtigo(urlArtigo)) throw new Error("Erro inesperado");
        const select = new Select();
        select
            .from(['tb_artigos'])
            .innerJoin('tb_usuarios')
            .on(new Operation().column('tb_artigos.user_id').equal.column('tb_usuarios.user_id'))
            .where(new Operation().column('art_url').equal.value(urlArtigo))
        const artigoBruto = (await select.sendQuery())[0][0];
        const artigoProcessado = {
            titulo: artigoBruto['art_titulo'],
            conteudo: artigoBruto['art_conteudo'],
            dataPublicacao: artigoBruto['art_data_publicacao'],
            id: artigoBruto['art_id'],
            url: artigoBruto['art_url'],
            autorId: artigoBruto['user_id'],
            autorNome: artigoBruto['user_nome'],
            autorSobrenome: artigoBruto['user_sobrenome'],
        }
        return artigoProcessado;
    }
    meusArtigos(credencial) {
        /* return new Promise((resolve, reject) => {
            if (!this.#validador.credencial(credencial)) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#sqlDb.query("CALL pro_pegue_meus_artigos(?);", [credencial],
                    (err, results) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve(results[0]);
                        }
                    });
            }
        }); */
    }
    resumaVariosArtigos(quantidadeArtigos, urlArtigo) {
        /* return new Promise((resolve, reject) => {
            if (!((!urlArtigo || this.#validador.urlArtigo(urlArtigo)) && this.#validador.stringENumero(quantidadeArtigos))) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#sqlDb.query("CALL pro_resuma_varios_artigos(?, ?)", [quantidadeArtigos, urlArtigo || ''],
                    (err, results) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve(results[0]);
                        }
                    });
            }
        }); */
    }
}
export default Biblioteca;
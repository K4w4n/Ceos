import { Select, Operation } from "./conectionMysql.js";
import Validador from "./validador.js";
import jwt from 'jsonwebtoken';

const secret = process.env.secret;

const validador = new Validador;
class ControleConta {
    async facaLogin(email, senha) {
        if (!validador.email(email) && !validador.senha(senha)) { throw new Error("Erro inesperado") };
        const select = new Select(["user_id", "user_email", "user_nome", "user_sobrenome"])
            .from(['tb_usuarios'])
            .where(new Operation().column('user_email').equal.value(email).and.column('user_senha').equal.value(senha));

        const dadosDb = await select.sendQuery();
        const token = jwt.sign({ id: dadosDb[0][0]['user_id'] }, secret, { expiresIn: 5184000 }); //60 dias
        const usuario = {
            nome: dadosDb[0][0]['user_nome'],
            sobrenome: dadosDb[0][0]['user_sobrenome'],
            email: dadosDb[0][0]['user_email'],
            id: dadosDb[0][0]['user_id'],
            token,
        };
        return usuario;
    }
    registre(nome, sobreNome, email, senha) {
        return new Promise((resolve, reject) => {
            /* if (!(this.#validador.nome(nome)
                && this.#validador.sobrenome(sobreNome)
                && this.#validador.email(email)
                && this.#validador.senha(senha))) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#connection.query('CALL pro_registro(?, ?, ?, ?)', [email, senha, nome, sobreNome],
                    (err) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve();
                        }
                    });
            } */
        });
    }
    async confirmeToken(token) {
        const { id } = jwt.verify(token, secret);
        const select = new Select(["user_id", "user_email", "user_nome", "user_sobrenome"])
            .from(['tb_usuarios'])
            .where(new Operation().column('user_id').equal.value(id));

        const dadosDb = await select.sendQuery();
        const usuario = {
            nome: dadosDb[0][0]['user_nome'],
            sobrenome: dadosDb[0][0]['user_sobrenome'],
            email: dadosDb[0][0]['user_email'],
            id: dadosDb[0][0]['user_id'],
        };
        return usuario;
    }
    canceleChaveCredencial(credencial) {
        return new Promise((resolve, reject) => {
            /* if (!this.#validador.credencial(credencial)) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#connection.query('CALL pro_confirme_credencial(?)', [credencial],
                    (err) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve();
                        }
                    });
            } */
        });
    }
}
export default ControleConta;
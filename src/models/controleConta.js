class ControleConta {
    #connection;
    #validador;
    constructor(connection, validador) {
        this.#connection = connection;
        this.#validador = validador;
    }
    facaLogin(email, senha) {
        return new Promise((resolve, reject) => {
            if (!this.#validador.email(email) && !this.#validador.senha(senha)) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#connection.query('CALL pro_login(?, ?)', [email, senha],
                    (err, results) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve(results[0][0]);
                        }
                    });
            }
        });
    }
    registre(nome, sobreNome, email, senha) {
        return new Promise((resolve, reject) => {
            if (!(this.#validador.nome(nome)
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
            }
        });
    }
    confirmeChaveCredencial(credencial) {
        return new Promise((resolve, reject) => {
            if (!this.#validador.credencial(credencial)) {
                reject({ msg: "Dados invalidos" });
            } else {
                this.#connection.query('CALL pro_confirme_credencial(?)', [credencial],
                    (err, results) => {
                        if (err) {
                            reject({ msg: err });
                        } else {
                            resolve(results[0][0]);
                        }
                    });
            }
        });
    }
    canceleChaveCredencial(credencial) {
        return new Promise((resolve, reject) => {
            if (!this.#validador.credencial(credencial)) {
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
            }
        });
    }
}
export default ControleConta;
class ControleConta {
    #connection;
    #validador;
    constructor(connection, validador) {
        this.#connection = connection;
        this.#validador = validador;
    }
    facaLogin(email, senha, callBack) {
        if (!this.#validador.email(email) && !this.#validador.senha(senha)) {
            callBack();
            return;
        }
        const connection = this.#connection();
        connection.query('CALL pro_login(?, ?)', [email, senha],
            (err, results) => {
                if (err) {
                    callBack({});
                    return;
                }
                results[0][0].ok = true;
                callBack(results[0][0]);
            });
    }
    registre(nome, sobreNome, email, senha, callBack) {
        if (this.#validador.nome(nome)
            && this.#validador.sobrenome(sobreNome)
            && this.#validador.email(email)
            && this.#validador.senha(senha)
        ) {
            const connection = this.#connection();
            connection.query('CALL pro_registro(?, ?, ?, ?)', [email, senha, nome, sobreNome],
                (err, results) => {
                    if (err) {
                        callBack({});
                        return;
                    } else {
                        callBack({ ok: true });
                    }
                });
        } else {
            callBack({});
        }
    }
    confirmeChaveCredencial(credencial, callBack) {
        if (!this.#validador.credencial(credencial)) {
            callBack({});
            return;
        }
        const connection = this.#connection();
        connection.query('CALL pro_confirme_credencial(?)', [credencial],
            (err, results) => {
                if (err) {
                    callBack({});
                    return;
                }
                results[0][0].ok = true;
                callBack(results[0][0]);
            });
    }
    canceleChaveCredencial(credencial, callBack) {
        if (!this.#validador.credencial(credencial)) {
            callBack({});
            return;
        }
        const connection = this.#connection();
        connection.query('CALL pro_cancelar_credencial(?);', [credencial],
            (err, results) => {
                if (err) {
                    callBack({});
                    return;
                } else {
                    callBack({ ok: true });
                }
            });
    }
}
export default ControleConta;
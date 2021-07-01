import { Validador } from './validador.js';
const connection = require('./conectionMysql.js').connection;

class controleConta {
    #connection;
    #validador;
    constructor(connection, validador) {
        this.#connection = connection;
        this.#validador = validador;
    }
    facaLogin(email, senha, callBack) {
        if (!ferramentas.validaEmail(email) && !ferramentas.validaSenha(senha)) {
            callBack(new Resposta('Email ou senha invalido', false));
            return;
        }
        this.#connection.query('CALL pro_login(?, ?)', [email, senha],
            (err, results) => {
                if (err) {
                    callBack(new Resposta('Erro inesperado!', false));
                    return;
                }
                callBack(new Resposta('Credencial pronta!', true, results[0][0]));
            });
    }
    registre(nome, sobreNome, email, senha, callBack) {
        if (this.#validador.nome(nome)
            && this.#validador.sobreNome(sobreNome)
            && this.#validador.email(email)
            && this.#validador.senha(senha)
        ) {
            this.#connection.query('CALL pro_registro(?, ?, ?, ?)', [email, nome, sobreNome, senha],
                (err, results) => {
                    if (err) {
                        callBack(new Resposta('Erro inesperado!', false));
                        return;
                    }
                    if (results[0][0].Msg == 'Conta criada com sucesso.') {
                        callBack(new Resposta('Usuario registrado', true));
                    } else if (results[0][0].Msg = 'Email ja existe.') {
                        callBack(new Resposta('O email já existe', false));
                    }
                });
        } else {
            callBack(false);
        }
    }
    confirmeChaveCredencial(credencial, callBack) {
        if (!ferramentas.validaCredencial(credencial)) {
            callBack(new Resposta('Credencial invalida!', false));
            return;
        }
        this.#connection.query('CALL pro_confirme_credencial(?)', [credencial],
            (err, results) => {
                if (err) {
                    callBack(new Resposta('Erro inesperado!', false));
                    return;
                }
                callBack(new Resposta('Concluido!', true, { credencialRegistrada: !!results[0][0].credencialRegistrada }));
            });
    }
    canceleChaveCredencial(credencial, callBack) {
        if (!ferramentas.validaCredencial(credencial)) {
            callBack(new Resposta('Credencial invalida!', false));
            return;
        }
        this.#connection.query('CALL pro_cancelar_credencial(?);', [credencial],
            (err, results) => {
                if (err) {
                    callBack(new Resposta('Erro inesperado!', false));
                    return;
                }
                if (results[0][0].Msg == 'Credencial invalida.') {
                    callBack(new Resposta('Credencial invalida.', false));
                } else if (results[0][0].Msg == 'Deletado.') {
                    callBack(new Resposta('Concluido!', true));
                }
            });
    }
}
exports = controleConta;
a = new controleConta(connection, new Validador());
console.log(a.registre());
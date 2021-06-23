const connection = require('./conectionMysql.js').connection;//vc parou aqui
const ferramentas = require('./ferramentas.js');
const Resposta = require('./resposta.js').Resposta;

exports.facaLogin = function (email, senha, callBack) {
    if (!ferramentas.validaEmail(email) && !ferramentas.validaSenha(senha)) {
        callBack(new Resposta('Email ou senha invalido', false));
        return;
    }
    connection.query('CALL pro_login(?, ?)', [email, senha],
        (err, results) => {
            if (err) {
                callBack(new Resposta('Erro inesperado!', false));
                return;
            }
            callBack(new Resposta('Credencial pronta!', true, results[0][0]));
        });
}

exports.registre = function (nome, sobreNome, email, senha, callBack) {
    if (!ferramentas.validaEmail(email) && !ferramentas.validaSenha(senha) && sobreNome > 35) {
        callBack(new Resposta('Email ou senha invalido', false));
        return;
    }
    connection.query('CALL pro_registro(?, ?, ?, ?)', [email, nome, sobreNome, senha],
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
}

exports.confirmeChaveCredencial = function (credencial, callBack) {
    if (!ferramentas.validaCredencial(credencial)) {
        callBack(new Resposta('Credencial invalida!', false));
        return;
    }
    connection.query('CALL pro_confirme_credencial(?)', [credencial],
        (err, results) => {
            if (err) {
                callBack(new Resposta('Erro inesperado!', false));
                return;
            }
            callBack(new Resposta('Concluido!', true, { credencialRegistrada: !!results[0][0].credencialRegistrada }));
        });
}

exports.canceleChaveCredencial = function (credencial, callBack) {
    if (!ferramentas.validaCredencial(credencial)) {
        callBack(new Resposta('Credencial invalida!', false));
        return;
    }
    connection.query('CALL pro_cancelar_credencial(?);', [credencial],
        (err, results) => {
            if (err) {
                callBack(new Resposta('Erro inesperado!', false));
                return;
            }
            if (results[0][0].Msg == 'Credencial invalida.') {
                callBack(new Resposta('Credencial invalida.', false));
            } else if(results[0][0].Msg == 'Deletado.'){
                callBack(new Resposta('Concluido!', true));
            }
        });
}
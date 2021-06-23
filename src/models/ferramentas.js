exports.validaEmail = function (email) {
    const reg = /^[\w.\+]+@\w+.\w{2,}(?:.\w{2})?$/;
    return reg.test(email) && email.length <= 320;
}
exports.validaSenha = function (senha) {
    return (senha.length >= 8 && senha.length <= 255);
}
exports.validaCredencial = function (credencial) {
    return credencial.length == 8;
}

class Resposta {
    constructor(info, sucesso, dados) {
        this.status = {
            info,
            sucesso
        };
        this.dados = dados;
    }
}
exports.Resposta = Resposta;
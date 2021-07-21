class Validador {
    #config = {
        email: {
            tamanhoMax: 320
        },
        senha: {
            tamanhoMin: 8,
            tamanhoMax: 255
        },
        nome: {
            tamanhoMax: 35
        },
        sobrenome: {
            tamanhoMax: 35
        },
        credencial: {
            tamanho: 8
        },
    };
    constructor(config) {
        this.alterarConfiguracoes(config);
    }
    senha(senha) {
        return (senha.length >= this.#config.senha.tamanhoMin
            && senha.length <= this.#config.senha.tamanhoMax);
    }
    email(email) {
        const reg = /^[\w.\+]+@\w+.\w{2,}(?:.\w{2})?$/;
        return (reg.test(email) && email.length <= this.#config.email.tamanhoMax);
    }
    nome(nome) {
        return (!!nome && nome.length <= this.#config.nome.tamanhoMax)
    }
    sobrenome(sobrenome) {
        return (!!sobrenome && sobrenome.length <= this.#config.sobrenome.tamanhoMax);
    }
    credencial(credencial) {
        return (credencial.length == this.#config.credencial.tamanho);
    }
    urlArtigo(urlArtigo) {
        const reg = /^[a-zA-Z-0-9]+$/;
        return (reg.test(urlArtigo) && urlArtigo);
    }
    alterarConfiguracoes(config) {
        Object.assign(this.#config, config);
    }
}
export default Validador;
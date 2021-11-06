import { errorList } from './erros.js';
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
            tamanhoMax: 35,
            tamanhoMin: 3,
        },
        sobrenome: {
            tamanhoMax: 35,
            tamanhoMin: 3,
        },
        credencial: {
            tamanho: 8
        },
    };
    constructor(config) {
        this.alterarConfiguracoes(config);
    }
    senha(senha) {
        return (typeof senha == 'string' && (senha.length >= this.#config.senha.tamanhoMin
            && senha.length <= this.#config.senha.tamanhoMax));
    }
    email(email) {
        const reg = /^[\w.\+]+@\w+.\w{2,}(?:.\w{2})?$/;
        return (typeof email == 'string'
            && reg.test(email)
            && email.length <= this.#config.email.tamanhoMax);
    }
    nome(nome) {
        const regexTemNumero = /[0-9]/;
        return (typeof nome == 'string'
            && !regexTemNumero.test(nome)
            && !!nome
            && nome.length <= this.#config.nome.tamanhoMax
            && nome.length >= this.#config.nome.tamanhoMin);
    }
    sobrenome(sobrenome) {
        const regexTemNumero = /[0-9]/;
        return (typeof sobrenome == 'string'
            && !regexTemNumero.test(sobrenome)
            && !!sobrenome
            && sobrenome.length <= this.#config.sobrenome.tamanhoMax
            && sobrenome.length >= this.#config.sobrenome.tamanhoMin);
    }
    urlArtigo(urlArtigo) {
            if (typeof urlArtigo != 'string') throw errorList[1];

            if (urlArtigo.length == 0) throw errorList[2];

            if (urlArtigo.toLowerCase() != urlArtigo) throw errorList[3];

            if (urlArtigo.search(' ') != -1) throw errorList[5];

            if (/\W|_/.test('loren'.replaceAll('-', ''))) throw errorList[4];

        return true;
    }
    stringENumero(string) {
        return (!isNaN(parseFloat(string)) && isFinite(string));
    }
    alterarConfiguracoes(config) {
        Object.assign(this.#config, config);
    }
}
export default Validador;
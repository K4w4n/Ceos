import { errorList } from './erros.js';

class Validador {
    #config = {
        email: {
            tamanhoMax: 320
        },
        senha: {
            tamanhoMin: 6,
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
        if (typeof urlArtigo != 'string') throw errorList[6];
        if (senha.length >= this.#config.senha.tamanhoMin) throw errorList[7];
        if (senha.length <= this.#config.senha.tamanhoMax) throw errorList[8];
        return true;
    }
    email(email) {
        if (!email) throw errorList[12];
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(email)) throw errorList[9];
        return true;
    }
    nome(nome) {
        const regNumero = /[0-9]/;
        const regCaractereEspecial = /\W|_/;
        if (!nome) throw errorList[11];
        if (regNumero.test(nome)) throw errorList[10];
        if (regCaractereEspecial.test(nome)) throw errorList[15];
        if (nome.length <= this.#config.nome.tamanhoMax) throw errorList[13];
        if (nome.length >= this.#config.nome.tamanhoMin) throw errorList[14];
        return true;
    }
    sobrenome(sobrenome) {
        const regCaractereEspecial = /\W|_/;
        const regNumero = /[0-9]/;
        if (sobrenome.length > this.#config.sobrenome.tamanhoMax) throw errorList[16];
        if (sobrenome.length < this.#config.sobrenome.tamanhoMin) throw errorList[17];
        if (!sobrenome) throw errorList[18];
        if (regCaractereEspecial.test(sobrenome)) throw errorList[19];
        if (regNumero.test(sobrenome)) throw errorList[20];
        return true;
    }
    urlArtigo(urlArtigo) {
        if (typeof urlArtigo != 'string') throw errorList[1];
        if (urlArtigo.length == 0) throw errorList[2];
        if (urlArtigo.toLowerCase() != urlArtigo) throw errorList[3];
        if (urlArtigo.search(' ') != -1) throw errorList[5];
        if (/\W|_/.test(urlArtigo.replaceAll('-', ''))) throw errorList[4];
        return true;
    }
    alterarConfiguracoes(config) {
        Object.assign(this.#config, config);
    }
}
export default Validador;
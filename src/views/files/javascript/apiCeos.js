class Artigo {
    constructor(idArtigo, titulo, conteudo,) {
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.idArtigo = idArtigo;
    }
}
const apiCeos = (() => {
    const user = {
        login(email, senha, callBack = console.log) {
            const dataLogin = { email: email, senha: senha }
            ajax('./api/user/login/', dataLogin, (data) => {
                if (data.status.sucesso) {
                    this.nome = data.dados.nome;
                    this.sobrenome = data.dados.sobrenome;
                    this.email = data.dados.email;
                    this.credencial = data.dados.credencial;
                }
                callBack(data);
            });
        },
        registre(nome, sobrenome, email, senha, callBack = console.log) {
            const dataUser = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha
            }
            ajax('./api/user/registro/', dataUser, (data) => {
                //add futuramente uma forma dos dados do usuario virem junto com o registro
                /* if (data.status.sucesso) {
                    this.nome = data.dados.nome;
                    this.sobrenome = data.dados.sobrenome;
                    this.email = data.dados.email;
                    this.credencial = data.dados.credencial;
                } */
                callBack(data);
            });
        },
        logoff(callBack = console.log) {
            const data = { credencial: this.credencial }
            ajax('./api/user/logoff/', data, (data) => {
                if (data.status.sucesso) {
                    delete this.nome;
                    delete this.sobrenome;
                    delete this.email;
                    delete this.credencial;
                }
                callBack(data);
            });
        }
    }
    const bibliotecaLocal = {
        resumos: [],
        pushResumos(quantidadeArtigos, callBack) {
            const data = {
                codArtigo: this.resumos[this.resumos.length - 1],
                quantidadeArtigos: quantidadeArtigos
            }
            ajax('./api/biblioteca/pushResumos/', data, callBack);
        },
        restart() {
            this.resumos = [];
        }
    }
    const editora = {
        artigoEmEdicao: undefined,
        abrirArtigo(idArtigo, credencial, callBack) {
            const data = {
                idArtigo: idArtigo,
                credencial: credencial
            }
            ajax('./api/editora/abrirArtigo/', data, callBack);
        },
        criarArtigo(idArtigo, credencial, callBack) {
            const data = {
                idArtigo: idArtigo,
                credencial: credencial
            }
            ajax('./api/editora/criarArtigo/', data, callBack);
        },
        fecharArtigo(callBack) {
            this.artigoEmEdicao = undefined;
        },
        salvarArtigo(credencial, callBack) {
            const data = {
                artigo: this.artigoEmEdicao,
                credencial: credencial
            }
            ajax('./api/editora/salvarArtigo/', data, callBack);
        }
    }

    return ({
        user: user,
        bibliotecaLocal: bibliotecaLocal,
        editora: editora
    });
})();

function ajax(endereco, argumentos, callBack) {
    const linkFormatado = Object.entries(argumentos).reduce(function (a, b) { return a + b[0] + '=' + b[1] + '&' }, endereco + '?');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', linkFormatado);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                callBack(JSON.parse(xhr.responseText));
            } catch (e) {
                alert('Nos desculpe pelo inconveniente, ocorreu algum erro.');
                console.log(e);
            }
        }
    }
    xhr.send();
}
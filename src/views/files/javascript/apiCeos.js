class Artigo {
    constructor(idArtigo, titulo, conteudo,) {
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.idArtigo = idArtigo;
    }
}
const apiCeos = (() => {
    const user = {
        login(email, senha) {
            const aviseQuandoPuder = fetch("api/user/login/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ email: email, senha: senha }),
            }).then(response => response.json());
            aviseQuandoPuder.then((dados) => {
                this.nome = dados.nome;
                this.sobrenome = dados.sobrenome;
                this.email = dados.email;
                this.credencial = dados.credencial;
            })
            return aviseQuandoPuder;
        },
        registro(nome, sobrenome, email, senha) {
            const dataUser = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha
            }
            const aviseQuandoPuder = fetch("api/user/registro/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(dataUser),
            });
            return aviseQuandoPuder;
        },
        logoff() {
            const aviseQuandoPuder = fetch("/api/user/logoff/", {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            return aviseQuandoPuder;
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
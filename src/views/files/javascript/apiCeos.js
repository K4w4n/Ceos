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
            aviseQuandoPuder.then((data) => {
                Object.assign(this, data);
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
            aviseQuandoPuder.then(() => {
                this.credencial = undefined;
                this.email = undefined;
                this.nome = undefined;
                this.sobrenome = undefined;
            });
            return aviseQuandoPuder;
        },
        confirmeCredencial() {
            const aviseQuandoPuder = fetch("/api/user/confirmecredencial/", {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(response => response.json());
            aviseQuandoPuder.then((data) => {
                Object.assign(this, data);
            })
            return aviseQuandoPuder;
        }
    }
    const biblioteca = {
        resumos: [],
        pushResumos(quantidadeArtigos) {
            const data = {
                url: this.resumos[0] ? this.resumos[this.resumos.length - 1].url : undefined,
                quantidadeArtigos: quantidadeArtigos
            }
            const aviseQuandoPuder = fetch(`/api/biblioteca/pushResumos?${data.url ? `artigo=${data.url}&` : ''}quantidadeArtigos=${data.quantidadeArtigos}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(response => response.json());
            aviseQuandoPuder.then((novosResumos) => {
                this.resumos = [...this.resumos, ...novosResumos];
            });
            return aviseQuandoPuder;
        },
        pushMeusArtigos() {
            const aviseQuandoPuder = fetch('/api/biblioteca/meusArtigos', {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(response => response.json());
            aviseQuandoPuder.then((meusArtigos) => {
                this.meusArtigos = meusArtigos;
            });
            return aviseQuandoPuder;
        },
        restart() {
            this.resumos = [];
        }
    }
    const editora = {
        artigoEmEdicao: undefined,
        abrirArtigo(url) {
            const data = { url: url }
            const aviseQuandoPuder = fetch(`/api/editora/abrirArtigo?url=${url}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(response => response.json());
            aviseQuandoPuder.then(data => this.artigoEmEdicao = { ...data, ...this.artigoEmEdicao });
            return aviseQuandoPuder;
        },
        criarArtigo(url) {
            const data = {
                url: url,
            }
            const aviseQuandoPuder = fetch("/api/editora/criarArtigo/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(data)
            }).then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    return response;
                }
            })
            return aviseQuandoPuder;
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
        biblioteca: biblioteca,
        editora: editora
    });
})();
const ApiCeos = (() => {
    const dominio = 'http://localhost:8080';
    /* const dominio = 'https://ceoscommunity.herokuapp.com'; */
    class Usuario {
        constructor() {
            this.confirmeCredencial();
        }
        login(email, senha) {
            return fetch(dominio + "/api/user/login/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ email: email, senha: senha }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response
                })
                .then(response => {
                    return response.json()
                })
                .then((data) => {
                    Object.assign(this, data);
                    return data;
                });
        }
        registro(nome, sobrenome, email, senha) {
            const dataUser = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha
            }
            const aviseQuandoPuder = fetch(dominio + "/api/user/registro/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(dataUser),
            });
            return aviseQuandoPuder;
        }
        logoff() {
            const aviseQuandoPuder = fetch(dominio + "/api/user/logoff/", {
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
        }
        confirmeCredencial() {
            return fetch(`${dominio}/api/user/confirmecredencial/`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(response => response.json()
            ).then((dadosUsuario) => {
                Object.assign(this, dadosUsuario);
                return dadosUsuario;
            });
        }
    }
    class Biblioteca {
        constructor() {
            this.resumos = [];
        }
        pushResumos(quantidadeArtigos) {
            const data = {
                url: this.resumos[0] ? this.resumos[this.resumos.length - 1].url : undefined,
                quantidadeArtigos: quantidadeArtigos
            }
            const aviseQuandoPuder = fetch(dominio + `/api/biblioteca/pushResumos?${data.url ? `artigo=${data.url}&` : ''}quantidadeArtigos=${data.quantidadeArtigos}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(response => response.json());
            aviseQuandoPuder.then((novosResumos) => {
                this.resumos = [...this.resumos, ...novosResumos];
            });
            return aviseQuandoPuder;
        }
        pushMeusArtigos() {
            const aviseQuandoPuder = fetch(dominio + '/api/biblioteca/meusArtigos', {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(response => response.json());
            aviseQuandoPuder.then((meusArtigos) => {
                this.meusArtigos = meusArtigos;
            });
            return aviseQuandoPuder;
        }
        restart() {
            this.resumos = [];
        }
    }
    class Editora {
        constructor() { }
        /* abrirArtigo(url) {
            const data = { url: url }
            const aviseQuandoPuder = fetch(dominio + `/api/editora/abrirArtigo?url=${url}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(response => response.json());
            aviseQuandoPuder.then(data => this.artigoEmEdicao = { ...data, ...this.artigoEmEdicao });
            return aviseQuandoPuder;
        } */
        criarArtigo(url) {
            const data = {
                url: url,
            }
            const aviseQuandoPuder = fetch(dominio + "/api/editora/criarArtigo/", {
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
        }
        salvarArtigo(url, artigo) {/* Editar artigo? */
            const data = { url, artigo }
            const aviseQuandoPuder = fetch(dominio + "/api/editora/salvarArtigo/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
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
        }
    }
    class ApiCeos {
        constructor() {
            this.usuario = new Usuario();
            this.biblioteca = new Biblioteca();
            this.editora = new Editora();
        }
    }
    return ApiCeos;
})();
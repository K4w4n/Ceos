const ApiCeos = (() => {
    const dominio = window.origin;
    class Usuario {
        constructor() {
            this.confirmeToken();
        }
        async login(email, senha) {
            const response = await fetch(dominio + "/api/user/login/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ email: email, senha: senha }),
                credentials: 'same-origin'
            });
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const dadosUsuario = await response.json();
            Object.assign(this, dadosUsuario);
            return dadosUsuario;
        }
        async registro(nome, sobrenome, email, senha) {
            const dataUser = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha
            }
            const response = await fetch(dominio + "/api/user/registro/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(dataUser),
            });
            const dadosUsuario = await response.json();
            Object.assign(this, dadosUsuario);
            return dadosUsuario;
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
        async confirmeToken() {
            const response = await fetch(`${dominio}/api/user/confirmetoken/`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });

            const dadosUsuario = await response.json();
            Object.assign(this, dadosUsuario);
            return dadosUsuario;
        }
    }
    class Biblioteca {
        #pagina = 0;
        constructor() {
            this.resumos = [];
        }
        async pushResumos() {
            const response = await fetch(dominio + `/api/biblioteca/pushResumos?quantidadeArtigos=5&pagina=${this.#pagina}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            const artigosJson = await response.json();
            this.resumos = [...this.resumos, ...artigosJson];
            this.#pagina++;
            return artigosJson;
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
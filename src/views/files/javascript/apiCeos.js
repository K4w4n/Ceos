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
        async logoff() {
            const response = await fetch(dominio + "/api/user/logoff/", {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            this.credencial = undefined;
            this.email = undefined;
            this.nome = undefined;
            this.sobrenome = undefined;
            this.id = undefined;
            return;
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
        #paginaResumos = 0;
        #paginaMeusArtigos = 0;
        #paginaPesquisa = 0
        meusArtigos = [];
        pesquisaArtigos = [];
        constructor() {
            this.resumos = [];
        }
        async pushResumos() {
            const response = await fetch(dominio + `/api/biblioteca/pushResumos?quantidadeArtigos=5&pagina=${this.#paginaResumos}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            const artigosJson = await response.json();
            this.resumos = [...this.resumos, ...artigosJson];
            this.#paginaResumos++;
            return artigosJson;
        }
        async pushMeusArtigos() {
            const response = await fetch(dominio + `/api/biblioteca/meusArtigos?quantidadeArtigos=5&pagina=${this.#paginaMeusArtigos}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            const meusArtigos = await response.json();
            this.meusArtigos = [...this.meusArtigos, ...meusArtigos];
            this.#paginaMeusArtigos++;
            return meusArtigos;
        }
        async pegueArtigo(url) {
            const response = await fetch(dominio + `/api/biblioteca/artigo/${url}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            const artigo = await response.json();
            artigo.dataPublicacao = new Date(artigo.dataPublicacao);
            return artigo;
        }
        async pesquise(texto) {
            const response = await fetch(dominio + `/api/biblioteca/search?quantidadeArtigos=5&pagina=${this.#paginaPesquisa}&texto=${texto}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            const pesquisaArtigos = await response.json();
            this.pesquisaArtigos = [...this.pesquisaArtigos, ...pesquisaArtigos];
            this.#paginaPesquisa++;
            return pesquisaArtigos;
        }
        restart() {
            this.resumos = [];
            this.meusArtigos = [];
            this.#paginaResumos = 0;
            this.#paginaMeusArtigos = 0;
        }
    }
    class Editora {
        constructor() { }
        async criarArtigo(titulo, conteudo, url) {
            const response = await fetch(dominio + "/api/editora/criarArtigo/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ titulo, conteudo, url })
            });
            const artigo = await response.json();
            artigo.url = `${dominio}/artigos/${artigo.url}`;
            return artigo;
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
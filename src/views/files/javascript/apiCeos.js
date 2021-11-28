const ApiCeos = (() => {
    const dominio = window.origin;
    /* Observer class */
    class Observable {
        constructor() {
            this.observers = [];
        }

        subscribe(f) {
            this.observers.push(f);
        }

        unsubscribe(f) {
            this.observers = this.observers.filter(subscriber => subscriber !== f);
        }

        notify(data) {
            this.observers.forEach(observer => observer(data));
        }
    }
    class Usuario extends Observable {
        constructor() {
            super();
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

            const dados = await response.json();

            if (!response.ok) throw dados;

            Object.assign(this, dados);
            this.notify(this);
            return dados;
        }
        async registro(nome, sobrenome, email, senha) {
            const dadosUsuario = { nome, sobrenome, email, senha };

            const response = await fetch(dominio + "/api/user/registro/", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(dadosUsuario),
            });

            const dados = await response.json();
            if (!response.ok) throw dados;

            Object.assign(this, dados);
            this.notify(this);
            return dados;
        }
        async logoff() {
            const response = await fetch(dominio + "/api/user/logoff/", {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            if (!response.ok) throw await response.json();

            this.credencial = undefined;
            this.email = undefined;
            this.nome = undefined;
            this.sobrenome = undefined;
            this.id = undefined;
            this.notify(this);
            return;
        }
        async confirmeToken() {
            const response = await fetch(`${dominio}/api/user/confirmetoken/`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            const dados = await response.json();

            if (!response.ok) throw dados;

            Object.assign(this, dados);
            this.notify(this);
            return dados;
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
            const dados = await response.json();

            if (!response.ok) throw dados;

            this.resumos = [...this.resumos, ...dados];
            this.#paginaResumos++
            return dados;
        }
        async pushMeusArtigos() {
            const response = await fetch(dominio + `/api/biblioteca/meusArtigos?quantidadeArtigos=5&pagina=${this.#paginaMeusArtigos}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            const dados = await response.json();

            if (!response.ok) throw dados;

            this.meusArtigos = [...this.meusArtigos, ...dados];
            this.#paginaMeusArtigos++;
            return dados;
        }
        async pegueArtigo(url) {
            const response = await fetch(dominio + `/api/biblioteca/artigo/${url}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });

            const dados = await response.json();

            if (!response.ok) throw dados;

            dados.dataPublicacao = new Date(dados.dataPublicacao);
            return dados;
        }
        async pesquise(texto) {
            const response = await fetch(dominio + `/api/biblioteca/search?quantidadeArtigos=5&pagina=${this.#paginaPesquisa}&texto=${texto}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });
            const dados = await response.json();

            if (!response.ok) throw dados;

            this.pesquisaArtigos = [...this.pesquisaArtigos, ...dados];
            this.#paginaPesquisa++;
            return dados;
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
            const dados = await response.json();

            if (!response.ok) throw dados;

            dados.url = `${dominio}/artigos/${dados.url}`;
            return dados;
        }
    }
    class ApiCeos {
        constructor(callBack = () => { }) {
            this.usuario = new Usuario(callBack);
            this.biblioteca = new Biblioteca();
            this.editora = new Editora();
        }
    }
    return ApiCeos;
})();
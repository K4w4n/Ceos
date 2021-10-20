import { Select, Operation } from "./conectionMysql.js";
import Validador from "./validador.js";
import jwt from 'jsonwebtoken';

const secret = process.env.secret;
const validador = new Validador();

class Biblioteca {
    constructor() {
    }
    async pegueArtigo(urlArtigo) {
        if (!validador.urlArtigo(urlArtigo)) throw new Error("Erro inesperado");
        const select = new Select();
        select
            .from(['tb_artigos'])
            .innerJoin('tb_usuarios')
            .on(new Operation().column('tb_artigos.user_id').equal.column('tb_usuarios.user_id'))
            .where(new Operation().column('art_url').equal.value(urlArtigo))
        const artigoBruto = (await select.sendQuery())[0][0];
        const artigoProcessado = {
            titulo: artigoBruto['art_titulo'],
            conteudo: artigoBruto['art_conteudo'],
            dataPublicacao: artigoBruto['art_data_publicacao'],
            id: artigoBruto['art_id'],
            url: artigoBruto['art_url'],
            autorId: artigoBruto['user_id'],
            autorNome: artigoBruto['user_nome'],
            autorSobrenome: artigoBruto['user_sobrenome'],
        }
        return artigoProcessado;
    }
    async meusArtigos(token, quantidade = 5, pagina = 0) {
        const { id } = jwt.verify(token, secret);
        const select = new Select();
        const artigosBruto = (await select
            .from(['tb_artigos'])
            .innerJoin('tb_usuarios')
            .on(new Operation().column('tb_artigos.user_id').equal.column('tb_usuarios.user_id'))
            .where(new Operation().column('tb_artigos.user_id').equal.value(id))
            .limit(quantidade, pagina * quantidade)
            .sendQuery())[0];
        const ListaArtigo =  artigosBruto.map(artigo => {
            const novoArtigo = processeArtigo(artigo);
            novoArtigo.conteudo = typeof novoArtigo.conteudo == "string" ? novoArtigo.conteudo.substr(0, 630) : novoArtigo.conteudo;
            return novoArtigo;
        });
        return ListaArtigo;
    }
    async resumaVariosArtigos(quantidade = 5, pagina = 0) {
        const select = new Select();
        const artigosBruto = (await select
            .from(['tb_artigos'])
            .innerJoin('tb_usuarios')
            .on(new Operation().column('tb_artigos.user_id').equal.column('tb_usuarios.user_id'))
            .limit(quantidade, pagina * quantidade)
            .sendQuery())[0];
        return artigosBruto.map(artigo => {
            const novoArtigo = processeArtigo(artigo);
            novoArtigo.conteudo = typeof novoArtigo.conteudo == "string" ? novoArtigo.conteudo.substr(0, 630) : novoArtigo.conteudo;
            return novoArtigo;
        });
    }
}
export default Biblioteca;

function processeArtigo(artigoBruto) {
    const artigoProcessado = {
        titulo: artigoBruto['art_titulo'],
        conteudo: artigoBruto['art_conteudo'],
        dataPublicacao: artigoBruto['art_data_publicacao'],
        id: artigoBruto['art_id'],
        url: artigoBruto['art_url'],
        autorId: artigoBruto['user_id'],
        autorNome: artigoBruto['user_nome'],
        autorSobrenome: artigoBruto['user_sobrenome'],
    }
    return artigoProcessado;
}
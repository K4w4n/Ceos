import { Select, Operation } from "./conectionMysql.js";
import Validador from "./validador.js";
import jwt from 'jsonwebtoken';
import { errorList } from './erros.js';

const secret = process.env.secret;
const validador = new Validador();

class Biblioteca {
    async pegueArtigo(urlArtigo) {
        validador.urlArtigo(urlArtigo);
        const select = new Select();
        select
            .from(['tb_artigos'])
            .innerJoin('tb_usuarios')
            .on(new Operation().column('tb_artigos.user_id').equal.column('tb_usuarios.user_id'))
            .where(new Operation().column('art_url').equal.value(urlArtigo));

        const artigoBruto = (await select.sendQuery())[0][0];
        if (!artigoBruto) throw errorList[21];
        const artigoProcessado = {
            titulo: artigoBruto['art_titulo'],
            conteudo: JSON.parse(artigoBruto['art_conteudo']),
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
        const ListaArtigo = artigosBruto.map(artigo => {
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
            novoArtigo.conteudo = JSON.parse(novoArtigo.conteudo);
            let caracteresNum = 0;
            console.log(novoArtigo.conteudo)
            novoArtigo.conteudo.blocks = novoArtigo.conteudo.blocks.filter(block => {
                caracteresNum += block.data.text.length;
                return caracteresNum < 700;
            });
            return novoArtigo;
        });
    }
    async pesquisar(textoPesquisa, quantidade = 5, pagina = 0) {
        textoPesquisa = `%${textoPesquisa.replace(/ /g, '%')}%`

        const select = new Select();
        const op = new Operation();

        select.from(['tb_artigos'])
            .innerJoin('tb_usuarios')
            .on(new Operation().column('tb_artigos.user_id').equal.column('tb_usuarios.user_id'))
            .where(op.column('art_titulo').like(textoPesquisa)
                .or.column('art_conteudo').like(textoPesquisa)
                .or.column('art_url').like(textoPesquisa))
            .limit(quantidade, pagina * quantidade);

        const artigosBruto = (await select.sendQuery())[0];

        const artigosProcessados = artigosBruto.map(artigo => {
            const novoArtigo = processeArtigo(artigo);
            novoArtigo.conteudo = JSON.parse(novoArtigo.conteudo);
            let caracteresNum = 0;
            console.log(novoArtigo.conteudo)
            novoArtigo.conteudo.blocks = novoArtigo.conteudo.blocks.filter(block => {
                caracteresNum += block.data.text.length;
                return caracteresNum < 700;
            });
            return novoArtigo;
        });
        return artigosProcessados;
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
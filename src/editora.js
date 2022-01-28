import { Insert, Operation, Select } from "./conectionMysql.js";
import Validador from "./validador.js";
import Biblioteca from "./biblioteca.js";
import jwt from 'jsonwebtoken';
import { errorList } from './erros.js';

const secret = process.env.secret;
const validador = new Validador();
const biblioteca = new Biblioteca();
class Editora {
    async crieArtigo({ titulo, conteudo, url }, token) {

        console.log('titulo', titulo);
        console.log('conteudo', conteudo);
        console.log('url', url);
        console.log('token', token);

        const { id } = jwt.verify(token, secret);

        console.log('id', id);

        validador.urlArtigo(url);

        console.log('Url válida');

        const insert = new Insert();
        try {
            if (await biblioteca.pegueArtigo(url)) throw errorList[27];
        } catch (error) {
            if (error.code == 27) throw error;
        }

        console.log('A url ta disponivel');

        await insert.into('tb_artigos')
            .columns(['user_id', 'art_titulo', 'art_conteudo', 'art_url'])
            .value([id, titulo, JSON.stringify(conteudo), url]).sendQuery();

        console.log('O artigo foi inserido');

        const select = new Select();
        select.from(['tb_artigos'])
            .where(new Operation().column('art_url').equal.value(url));
        const artigoBruto = (await select.sendQuery())[0][0];

        console.log('artigoBruto', artigoBruto);

        const artigo = {
            titulo: artigoBruto['art_titulo'],
            conteudo: artigoBruto['art_conteudo'],
            dataPublicacao: artigoBruto['art_data_publicacao'],
            id: artigoBruto['art_id'],
            url: artigoBruto['art_url'],
        }

        console.log('artigo', artigo);

        return artigo;
    }
}
export default Editora;
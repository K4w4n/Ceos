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

        const { id } = jwt.verify(token, secret);

        validador.urlArtigo(url);

        const insert = new Insert();
        try {
            if (await biblioteca.pegueArtigo(url)) throw errorList[27];
        } catch (error) {
            if(error.code == 27) throw error;
        }

        await insert.into('tb_artigos')
            .columns(['user_id', 'art_titulo', 'art_conteudo', 'art_url'])
            .value([id, titulo, JSON.stringify(conteudo), url]).sendQuery();

        const select = new Select();
        select.from(['tb_artigos'])
            .where(new Operation().column('art_url').equal.value(url));
        const artigoBruto = (await select.sendQuery())[0][0];

        const artigo = {
            titulo: artigoBruto['art_titulo'],
            conteudo: artigoBruto['art_conteudo'],
            dataPublicacao: artigoBruto['art_data_publicacao'],
            id: artigoBruto['art_id'],
            url: artigoBruto['art_url'],
        }
        return artigo;
    }
}
export default Editora;
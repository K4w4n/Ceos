import { Insert, Operation, Select } from "./conectionMysql.js";
import Validador from "./validador.js";
import jwt from 'jsonwebtoken';

const secret = process.env.secret;
const validador = new Validador();

class Editora {
    async crieArtigo({ titulo, conteudo, url }, token) {
        const { id } = jwt.verify(token, secret);
        if (!validador.urlArtigo(url)) throw new Error("Dados invalidos");
        const insert = new Insert();
        await insert.into('tb_artigos')
            .columns(['user_id', 'art_titulo', 'art_conteudo', 'art_url'])
            .value([id, titulo, conteudo, url]).sendQuery();
        const select = new Select();
        select.from(['tb_artigos'])
            .where(new Operation().column('art_url').equal.value(url)).sendQuery();
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
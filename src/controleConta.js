import { Select, Operation, Insert } from "./conectionMysql.js";
import Validador from "./validador.js";
import { errorList } from "./erros.js";
import jwt from 'jsonwebtoken';

const secret = process.env.secret;

const validador = new Validador;
class ControleConta {
    async facaLogin(email, senha) {
        validador.email(email);
        validador.senha(senha);
        const select = new Select(["user_id", "user_email", "user_nome", "user_sobrenome"])
            .from(['tb_usuarios'])
            .where(new Operation().column('user_email').equal.value(email).and.column('user_senha').equal.value(senha));

        const dadosDb = (await select.sendQuery())[0][0];

        if (!dadosDb) throw errorList[26];

        const token = jwt.sign({ id: dadosDb['user_id'] }, secret, { expiresIn: 5184000 }); //60 dias

        const usuario = {
            nome: dadosDb['user_nome'],
            sobrenome: dadosDb['user_sobrenome'],
            email: dadosDb['user_email'],
            id: dadosDb['user_id'],
            token,
        };
        const select2 = new Select().count()
            .from(['tb_artigos'])
            .where(new Operation().column('user_id').equal.value(usuario.id));

        usuario.numeroArtigos = ((await select2.sendQuery())[0][0]['COUNT(*)']);
        return usuario;
    }
    async registre(nome, sobreNome, email, senha) {
        validador.nome(nome);
        validador.sobrenome(sobreNome);
        validador.email(email);
        validador.senha(senha);

        const insert = new Insert();
        insert.into('tb_usuarios')
            .columns(['user_nome', 'user_sobrenome', 'user_email', 'user_senha'])
            .value([nome, sobreNome, email, senha]);
        try {
            await insert.sendQuery();
        } catch (error) {
            if (error.sqlState == '23000') throw errorList[24];
            throw error;
        }
        return await this.facaLogin(email, senha);
    }
    async confirmeToken(token) {
        let id;

        if (!token) throw errorList[22];

        try { id = jwt.verify(token, secret).id }
        catch (error) { throw errorList[23] }

        const select = new Select(["user_id", "user_email", "user_nome", "user_sobrenome"])
            .from(['tb_usuarios'])
            .where(new Operation().column('user_id').equal.value(id));

        const dadosDb = (await select.sendQuery())[0][0];

        if (!dadosDb) throw errorList[25];

        const usuario = {
            nome: dadosDb['user_nome'],
            sobrenome: dadosDb['user_sobrenome'],
            email: dadosDb['user_email'],
            id: dadosDb['user_id'],
        };

        const select2 = new Select().count()
            .from(['tb_artigos'])
            .where(new Operation().column('user_id').equal.value(usuario.id));

        usuario.numeroArtigos = ((await select2.sendQuery())[0][0]['COUNT(*)']);
        return usuario;
    }
    async canceleToken(token) {
        //criar tabela que vai armazenar os tokens desnecessrios
        return;
    }
}
export default ControleConta;
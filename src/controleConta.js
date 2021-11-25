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

        const dadosDb = await select.sendQuery();
        const token = jwt.sign({ id: dadosDb[0][0]['user_id'] }, secret, { expiresIn: 5184000 }); //60 dias
        const usuario = {
            nome: dadosDb[0][0]['user_nome'],
            sobrenome: dadosDb[0][0]['user_sobrenome'],
            email: dadosDb[0][0]['user_email'],
            id: dadosDb[0][0]['user_id'],
            token,
        };
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
        await insert.sendQuery();
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

        const dadosDb = await select.sendQuery();
        const usuario = {
            nome: dadosDb[0][0]['user_nome'],
            sobrenome: dadosDb[0][0]['user_sobrenome'],
            email: dadosDb[0][0]['user_email'],
            id: dadosDb[0][0]['user_id'],
        };
        return usuario;
    }
    async canceleToken(token) {
        //criar tabela que vai armazenar os tokens desnecessrios
        return;
    }
}
export default ControleConta;
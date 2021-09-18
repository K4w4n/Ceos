import dotenv from 'dotenv';
const config = dotenv.config();
import mysql2 from 'mysql2/promise';

export const connection = mysql2.createPool({
    host: process.env.host || 'localhost',
    user: process.env.user || 'app',
    database: process.env.database || 'db_ceos',
    password: process.env.password || '1RP9n3yCi&Y8jpdD2PLf@g@%^LKu5tVcQSL&4ASeSOpt%4UoHe'
});
//SELECT ['userid'] FROM 'tb_usuario' WHERE [{'user_email': 'www.seliganessa.com@gmail.com', 'user_senha':12345678}]
export class Mysql {
    constructor() { }
    get({ tabela, buscar, configBusca, colunas, quantidade, ordem }) {
        const dataInjection = [];
        const select = 'SELECT' + (colunas ? ' ' + colunas.join(', ') : ' *');
        const from = ` FROM ${tabela}`;

        // Configurando WHERE
        let where = '';
        if (typeof buscar == 'object' && !Array.isArray(buscar)) {
            const arrayWhere = [];

            for (const coluna in buscar) {
                arrayWhere.push(`${coluna} = ?`);
                dataInjection.push(buscar[coluna]);
            }

            where = ' WHERE ' + arrayWhere.join(' AND ');

        } else if (configBusca && configBusca.length > 0) {

            where = ' WHERE ' + configBusca.map(configuracao => {
                dataInjection.push(configuracao['valor']);
                return configuracao.coluna + ' ' + configuracao.operador + ' ' + '?';
            }).join(' AND ')
        }

        //Configurando ORDER BY
        let orderBy = '';
        if (ordem && Array.isArray(ordem.ordenadores) && ordem.ordenadores.length > 0) {
            orderBy = ' ORDER BY ' + ordem.ordenadores.join(', ');
            orderBy += ordem.crescente ? ' ASC' : ' DESC';
        }

        //Configurando LIMIT
        const limit = quantidade ? ' LIMIT ?' : '';
        if (quantidade) {
            dataInjection.push(quantidade);
        }

        const query = select + from + where + orderBy + limit + ';';

        return connection.query(query, dataInjection).then(dados => {
            return dados[0];
        });
    }
    set({ tabela, colunas, valores }) {
        const dataInjection = [];

        const insertInto = 'INSERT INTO ' + tabela + (colunas.length ? '(' + colunas.join(', ') + ')' : '');

        const values = ' VALUES ' + valores.map(insert => {
            const strInsert = insert.map(dado => {
                dataInjection.push(dado);
                return '?';
            }).join(', ');
            return '(' + strInsert + ')';
        }).join(', ');

        const query = insertInto + values + ';';
        return connection.query(query, dataInjection);//voce parou aqui
    }
    update() { }
    delete() { }
    #stringList(lista, separador = ', ') {
        let listaString = lista.reduce((listaString, iten) => {
            return listaString + iten + separador
        }, ' ');
        listaString = listaString.substring(0, listaString.length - separador.length) + ' ';
        return listaString;
    }
    #whereString(whereList) {
        let whereString = '';
        const whereListTatado = [];
        for (const coluna in whereList) {
            whereListTatado.push(`${coluna} = ?`);
        }
        return this.#stringList(whereListTatado, ' AND ');
    }
}
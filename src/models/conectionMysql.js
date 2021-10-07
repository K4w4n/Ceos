/* import dotenv from 'dotenv';
const config = dotenv.config();
import mysql2 from 'mysql2/promise';

export const connection = mysql2.createPool({
    host: process.env.host || 'localhost',
    user: process.env.user || 'app',
    database: process.env.database || 'db_ceos',
    password: process.env.password || '1RP9n3yCi&Y8jpdD2PLf@g@%^LKu5tVcQSL&4ASeSOpt%4UoHe'
}); */
/* export class Mysql {
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
        return connection.query(query, dataInjection);
    }
    update({ tabela, valor, condicao }) {
        const dataInjection = [];
        const update = 'UPDATE ' + tabela;
        let set = ' SET ';
        const setList = [];
        for (const index in valor) {
            setList.push(index + ' = ?');
            dataInjection.push(valor[index]);
        }
        set += setList.join(', ');
        let where = ' WHERE ' + condicao.map(configuracao => {
            dataInjection.push(configuracao['valor']);
            return configuracao.coluna + ' ' + configuracao.operador + ' ' + '?';
        }).join(' AND ')
        const query = update + set + where + ';';
        return connection.query(query, dataInjection);
    }
    delete({ tabela, condicao }) {
        const dataInjection = [];
        const deleteFrom = 'DELETE FROM ' + tabela;
        let where = ' WHERE ' + condicao.map(configuracao => {
            dataInjection.push(configuracao['valor']);
            return configuracao.coluna + ' ' + configuracao.operador + ' ' + '?';
        }).join(' AND ')
        const query = deleteFrom + where + ';';
        console.log(query, dataInjection);
        return connection.query(query, dataInjection);
    }
} */

export class Mysql {
    #values = [];
    #replacementKey = 'replacement_Key_06.01.2019';
    select(listaColunas = '*') {
        if(listaColunas == '*'){
            
        }
        return this;
    }
    where(listaColunas) {
        return this;
    }
    where(condition) {
        return this;
    }
    sendQuery() {
        return { query: 'aqui deveria ter uma query', values: [] };
    }
}

export class Operation {
    #values = [];
    #conditions = '';
    #replacementKey = 'replacement_Key_06.01.2019';
    column(columnName) {
        this.#conditions += ' ' + columnName;
        return this;
    }
    value(value) {
        this.#conditions += ' ' + this.#replacementKey;
        this.#values.push(value);
        return this;
    }
    get equal() {
        this.#conditions += ' =';
        return this;
    }
    get and() {
        this.#conditions += ' AND';
        return this;
    }
    get or() {
        this.#conditions += ' OR';
        return this;
    }
    get lesser() {
        this.#conditions += ' <';
        return this;
    }
    get lesserEqual() {
        this.#conditions += ' <=';
        return this;
    }
    get greater() {
        this.#conditions += ' >';
        return this;
    }
    get greaterEqual() {
        this.#conditions += ' >=';
        return this;
    }
    get different() {
        this.#conditions += ' !=';
        return this;
    }
    toString(value = '?') {
        const stringCondition = this.#values.reduce((accumulator, currentValue) => {
            return accumulator.replace(this.#replacementKey, value || currentValue);
        }, this.#conditions);
        return stringCondition;
    }
    allValues() {
        return this.#values;
    }
}
const query = new Mysql();
const op = new Operation();

query.select(['user_id']).where(op.column('user_email').equal.value('kawanAraujo@gmail.com').and.column('user_senha').equal.value('123456'));
console.log(op.toString());
console.log(op.allValues());
console.log(query.sendQuery());
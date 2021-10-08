/* import dotenv from 'dotenv';
const config = dotenv.config();
import mysql2 from 'mysql2/promise';

export const connection = mysql2.createPool({
    host: process.env.host || 'localhost',
    user: process.env.user || 'app',
    database: process.env.database || 'db_ceos',
    password: process.env.password || '1RP9n3yCi&Y8jpdD2PLf@g@%^LKu5tVcQSL&4ASeSOpt%4UoHe'
}); */

export class Select {
    #values = [];
    #query = '';
    constructor(listaColunas = '*') {
        if (listaColunas == '*') {
            this.#query += 'SELECT *\n'
        } else {
            this.#query += 'SELECT ' + listaColunas.join(', ') + '\n';
        }
        return this;
    }
    count(tableName) {
        this.#query = this.#query.replace('*', `COUNT(${tableName || '*'})`);
        return this;
    }
    from(listatabelas) {
        this.#query += ' FROM ' + listatabelas.join(', ') + '\n';
        return this;
    }
    where(condition) {
        this.#query += ' WHERE' + condition.toString('?') + '\n';
        this.#values = [...this.#values, ...condition.allValues()];
        return this;
    }
    limit(rowCount, offset = 0) {
        this.#query += ' LIMIT ?, ?';
        this.#values.push(offset);
        this.#values.push(rowCount);
        return this;
    }
    innerJoin(tableName) {
        this.#query += ' INNER JOIN ' + tableName + '\n';
        return this;
    }
    on(condition) {
        this.#query += ' ON' + condition.toString('?') + '\n';
        this.#values = [...this.#values, ...condition.allValues()];
        return this;
    }
    sendQuery() {
        return { query: this.#query + ';', values: this.#values };
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
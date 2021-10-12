import dotenv from 'dotenv';
const config = dotenv.config();
import mysql2 from 'mysql2/promise';

const connection = mysql2.createPool({
    host: process.env.host || 'localhost',
    user: process.env.user || 'app',
    database: process.env.database || 'db_ceos',
    password: process.env.password || '1RP9n3yCi&Y8jpdD2PLf@g@%^LKu5tVcQSL&4ASeSOpt%4UoHe'
});

export class Insert {
    #query = '';
    #values = [];
    into(tableName) {
        this.#query += `INSERT INTO ${tableName}`;
        return this;
    }
    columns(columnList) {
        this.#query += `(${columnList.join(', ')})`;
        return this;
    }
    value(valueList) {
        this.#values = [...this.#values, ...valueList];
        this.#query += `VALUES (${'?, '.repeat(valueList.length).slice(0, -2)})`;
        return this;
    }
    values(valueLists = []) {
        this.#query += 'VALUES ';
        valueLists.forEach(valueList => {
            this.#values = [...this.#values, ...valueList]
            this.#query += `(${'?, '.repeat(valueList.length).slice(0, -2)}),`;
        });
        this.#query = this.#query.slice(0, -1);
        return this;
    }
    sendQuery() {
        return connection.query(this.#query + ';', this.#values);
    }
}

export class Delete {
    #values = [];
    #query = 'DELETE';
    from(table) {
        this.#query += ' FROM ' + table;
        return this;
    }
    where(condition) {
        this.#query += ' WHERE' + condition.toString('?');
        this.#values = [...this.#values, ...condition.allValues()];
        return this;
    }
    sendQuery() {
        return connection.query(this.#query + ';', this.#values);
    }
}

export class Update {
    #values = [];
    #query = 'UPDATE';
    table(table) {
        this.#query += ' ' + table;
        return this;
    }
    set(columnValues) {
        this.#query += ' SET '
        for (const key in columnValues) {
            this.#query += `${key} = ?, `;
            this.#values.push(columnValues[key]);
        }
        this.#query = this.#query.slice(0, -2);
        return this;
    }
    where(condition) {
        this.#query += ' WHERE' + condition.toString('?');
        this.#values = [...this.#values, ...condition.allValues()];
        return this;
    }
    sendQuery() {
        return connection.query(this.#query + ';', this.#values);
    }
}

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
        this.#conditions += ' <>';
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
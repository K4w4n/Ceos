import dotenv from 'dotenv';
const config = dotenv.config();
import mysql2 from 'mysql2/promise';
/**
 * @deprecated Só utilize isso em casos de teste, isso é necessario para tornar os testes com jest viaveis e manter o sistema estavel
 */
export const connection = mysql2.createPool({
    host: process.env.host || 'localhost',
    user: process.env.user || 'app',
    database: process.env.database || 'db_ceos',
    password: process.env.password || '1RP9n3yCi&Y8jpdD2PLf@g@%^LKu5tVcQSL&4ASeSOpt%4UoHe'
});
/** 
 * Classe responsavel por Inserir dados no banco de dados MYSQL.
 * 
 * A maioria dos métodos internos retornam a referencia do objeto, fazendo com que seja possivel encadear 
 * metodos com syntaxe parecida ao sql.
 * 
 * Ao terminar a query basta utilizar o método ```sendQuery```.
 * 
 * Exemplos:
 * 
 * ```
 * new Insert().into("tb_usuarios");
 * ```
*/
export class Insert {
    /** armazena a query formatada @type {String} */
    #query = '';
    /** armazena os dados que devem ser enviados na query @type {Array} */
    #values = [];
    /**
     * Deve ser o primeiro metodo a ser invocado ao criar o objeto e só pode ser invocado uma vez.
     * 
     * Caso seja usado mais de uma vez será retornado um erro ao enviar a query.
     * 
     * O proximo método a ser chamado deverá ser o ```columns```
     * 
     * @param {String} tableName Nome da tabela onde os dados devem ser inseridos, este deve respeitar a syntaxe mysql.
     * @returns {Insert} Retorna a referencia do objeto, assim podendo encadear o próximo método.
     * */
    into(tableName) {
        this.#query += `INSERT INTO ${tableName}`;
        return this;
    }
    /**
     * Recebe a lista de colunas em que os dados devem ser inseridos.
     * 
     * O proximo método a ser chamado deverá ser o ```value``` ou ```values```
     * 
     * @param {String[]} columnList Array contendo os nomes das colunas.
     * @returns {Insert} Retorna a referencia do objeto, assim podendo encadear o próximo método.
     *  */
    columns(columnList) {
        this.#query += `(${columnList.join(', ')})`;
        return this;
    }
    /**
     * Recebe um array com os dados que devem ser inseridos na tabela.
     * 
     * Exemplo:
     * ```javascript
     * const insert = new Insert();
     * insert.into('tb_usuarios')
     *  .columns(['user_nome', 'user_sobrenome', 'user_email', 'user_senha'])
     *  .values(['Kawan', 'Araujo', 'kawan@email.com', '123456']);
     * ```
     * @param {Array} valueList Lista de dados que devem ser inseridos na tabela
     * @returns {Insert} Retorna a referencia do objeto, assim podendo encadear o próximo método.
     */
    value(valueList) {
        this.#values = [...this.#values, ...valueList];
        this.#query += `VALUES (${'?, '.repeat(valueList.length).slice(0, -2)})`;
        return this;
    }
    /**
     * Recebe um array de arrays seguindo o exemplo:
     * ```
     * const insert = new Insert();
     * insert.into('tb_usuarios')
     *  .columns(['user_nome', 'user_sobrenome', 'user_email', 'user_senha'])
     *  .values([
     *    ['Kawan', 'Araujo',  'kawan@email.com',  '123456'],
     *    ['Quezi', 'Mikelly', 'quezi@email.com',  '123456'],
     *    ['kayque','Araujo',  'kayque@email.com', '123456']
     *])
     * ```
     * @param {Array[]} valueLists Lista de listas de dados que devem ser inseridos na tabela
     * @returns {Insert} Retorna a referencia do objeto, assim podendo encadear o próximo método.
     */
    values(valueLists = []) {
        this.#query += 'VALUES ';
        valueLists.forEach(valueList => {
            this.#values = [...this.#values, ...valueList]
            this.#query += `(${'?, '.repeat(valueList.length).slice(0, -2)}),`;
        });
        this.#query = this.#query.slice(0, -1);
        return this;
    }
    /**
     * Envia a query para o banco de dados.
     * @returns {Promise} Resultado da consulta
     */
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
    constructor(listaColunas = []) {
        this.#query += 'SELECT ' + (listaColunas.join(', ') || '*');
        return this;
    }
    count(tableName) {
        this.#query = this.#query.replace('*', `COUNT(${tableName || '*'})`);
        return this;
    }
    from(listatabelas) {
        this.#query += ' FROM ' + listatabelas.join(', ');
        return this;
    }
    where(condition) {
        this.#query += ' WHERE ' + condition.toString('?');
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
        this.#query += ' INNER JOIN ' + tableName;
        return this;
    }
    on(condition) {
        this.#query += ' ON ' + condition.toString('?');
        this.#values = [...this.#values, ...condition.allValues()];
        return this;
    }
    sendQuery() {
        return connection.query(this.#query + ';', this.#values);
    }
}
/**
 * Classe responsavel por definir as operações lógicas que podem ser inseridas no where e on
 * 
 * Exemplos:
 * - Exemplo simples com Where
 * ```
 * new Select(['column1', 'column2', 'column3'])
 *   .from(['table1'])
 *   .where(new Operation().column('column1').equal.value(1));
 * ```
 * - Exemplo com inner join e where
 * ```
 * new Select(['column1', 'column2', 'column3'])
 *   .from(['table1'])
 *   .innerJoin('table2')
 *   .on(new Operation().column('table1.column1').equal.column('table2.column1'))
 *   .where(new Operation().column('table1.column1').equal.value(1));
 * ```
 */
export class Operation {
    #values = [];
    #conditions = '';
    #replacementKey = 'replacement_Key_06.01.2019';
    /**
     *Indica a coluna para fazer uma comparação.
     * @param {String} columnName Nome da coluna
     * @returns {this} Referencia do objeto para fazer o encadeamento
     */
    column(columnName) {
        this.#conditions += columnName;
        return this;
    }
    /**
     * Indica um valor para fazer uma comparação.
     * @param {String|Number|Boolean} value 
     * @returns 
     */
    value(value) {
        this.#conditions += this.#replacementKey;
        this.#values.push(value);
        return this;
    }
    /** 
     * operação de igualdade entre valores ou colunas.
     * @returns {this} Referencia do objeto para fazer o encadeamento.
     */
    get equal() {
        this.#conditions += ' = ';
        return this;
    }
    /**
     * compara duas expreções booleans, a primeira expreção deve ser declarada antes do and e a segunda depois.
     * 
     * Exemplo:
     * ```
     * new Operation().column('user_nome').equal.value('kawan').and.column('senha').equal.value('123456')
     * ```
     * @returns {this} Referencia do objeto para fazer o encadeamento.
     */
    get and() {
        this.#conditions += ' AND ';
        return this;
    }
    /**
     * compara duas expreções booleans, a primeira expreção deve ser declarada antes do OR e a segunda depois.
     * 
     * Exemplo:
     * ```
     * new Operation().column('user_cargo').equal.value('admin').or.column('user_cargo').equal.value('sub admin')
     * ```
     * @returns {this} Referencia do objeto para fazer o encadeamento.
     */
    get or() {
        this.#conditions += ' OR ';
        return this;
    }
    /** 
     * Operação de menor(<) entre valores ou colunas.
     * @returns {this} Referencia do objeto para fazer o encadeamento.
     */
    get lesser() {
        this.#conditions += ' < ';
        return this;
    }
    /** 
     * Operação de menor igual(<=) entre valores ou colunas.
     * @returns {this} Referencia do objeto para fazer o encadeamento.
     */
    get lesserEqual() {
        this.#conditions += ' <= ';
        return this;
    }
    /** 
     * Operação de maior(>) entre valores ou colunas.
     * @returns {this} Referencia do objeto para fazer o encadeamento.
     */
    get greater() {
        this.#conditions += ' > ';
        return this;
    }
    /** 
     * Operação de maior igual(>=) entre valores ou colunas.
     * @returns {this} Referencia do objeto para fazer o encadeamento.
     */
    get greaterEqual() {
        this.#conditions += ' >= ';
        return this;
    }
    /** 
     * Operação de diferente(<>) entre valores ou colunas. O equivalente no javascript seria !=
     * @returns {this} Referencia do objeto para fazer o encadeamento.
     */
    get different() {
        this.#conditions += ' != ';
        return this;
    }
    /**
     * Transforma a operação em string
     * @param {String} value Valor que deverá substituir os dados da query 
     * @returns {String} Condição no formato string
     */
    toString(value = '?') {
        const stringCondition = this.#values.reduce((accumulator, currentValue) => {
            return accumulator.replace(this.#replacementKey, value || currentValue);
        }, this.#conditions);
        return stringCondition;
    }
    /**
     * retorna todos os dados da query
     * @returns {Array} Lista de dados da query
     */
    allValues() {
        return this.#values;
    }
}
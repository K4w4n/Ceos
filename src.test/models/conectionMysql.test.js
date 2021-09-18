import { Mysql, connection } from "../../src/models/conectionMysql";

const bancoDeDados = new Mysql();

describe('Testando get no Mysql', () => {
    it('Query para pegar todos os produtos com quantidade menor igual a 5', () => {
        return bancoDeDados.get({
            tabela: 'tb_testes',
            configBusca: [{
                coluna: 'item_quantidade',
                operador: '<=',
                valor: 5
            }],
            quantidade: 3
        }).then(dados => {
            expect(dados).toEqual([
                { 'item_id': 1, 'item_name': 'colher', 'item_quantidade': 5 },
                { 'item_id': 3, 'item_name': 'garfo', 'item_quantidade': 3 },
                { 'item_id': 5, 'item_name': 'casada', 'item_quantidade': 1 }
            ]);
            return dados;
        });
    });

    it('query para pegar a quantidade de sapatos', () => {
        return bancoDeDados.get({
            tabela: 'tb_testes',
            buscar: { 'item_name': 'sapato' },
            colunas: ['item_quantidade'],
        }).then(dados => {
            expect(dados).toEqual([{ 'item_quantidade': 88 }]);
        });
    });

    it('query para pegar os 5 itens com id menor que 8 e que sejam diferentes de 5', () => {
        return bancoDeDados.get({
            tabela: 'tb_testes',
            configBusca: [
                {
                    coluna: 'item_id',
                    operador: '<',
                    valor: 8,
                },
                {
                    coluna: 'item_id',
                    operador: '!=',
                    valor: 5,
                },
            ],
            quantidade: 5,
        }).then(dados => {
            expect(dados).toEqual([
                { 'item_id': 1, 'item_name': 'colher', 'item_quantidade': 5 },
                { 'item_id': 3, 'item_name': 'garfo', 'item_quantidade': 3 },
                { 'item_id': 4, 'item_name': 'arma', 'item_quantidade': 15 },
                { 'item_id': 6, 'item_name': 'sapato', 'item_quantidade': 88 },
                { 'item_id': 7, 'item_name': 'papeis', 'item_quantidade': 8 },
            ]);
        });
    });
    it('query para pegar produtos com quantidade igual a 7 e id menor que 10', () => {
        return bancoDeDados.get({
            tabela: 'tb_testes',
            configBusca: [
                { coluna: 'item_quantidade', operador: '=', valor: 7 },
                { coluna: 'item_id', operador: '<', valor: 10 },
            ]
        }).then(dados => {
            expect(dados).toEqual([
                { 'item_id': 8, 'item_name': 'casaco', 'item_quantidade': 7 },
                { 'item_id': 9, 'item_name': 'maçam', 'item_quantidade': 7 },
            ]);
        });
    });
});

describe('Testando set do mysql', () => {
    it('inserindo itens robos', async () => {
        const dadosA = await bancoDeDados.set({
            tabela: 'tb_testes',
            colunas: ['item_name', 'item_quantidade'],
            valores: [['item Bot ' + Math.round(Math.random() * 100), Math.round(Math.random() * 10)]]
        });
        const dadosB = await bancoDeDados.get({
            tabela: 'tb_testes',
            ordem: {
                ordenadores: ['item_id'],
                crescente: false
            },
            quantidade: 1
        });
        expect(dadosA[0].insertId).toBe(dadosB[0]['item_id']);
    });

    it('testando Catch', () => {
        return bancoDeDados.set({
            tabela: 'tb_testes',
            colunas: ['item_name', 'item_quantidade'],
            valores: [
                ['algodão', 5],
                ['energetico', 3],
                ['sandalia', 12],
            ]
        }).then(() => {
            expect(true).toBe(false);
        }).catch(erro => {
            expect(true).toBe(true);
        });
    });
});
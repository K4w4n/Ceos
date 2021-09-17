import { Mysql } from "../../src/models/conectionMysql";

/* expect.extend({
    id(received, argument) {
        console.log(received, argument);
        if (typeof received[0] == 'number') {
            return {
                message: () => `O id de usuario é um numero(${received.id})`,
                pass: true,
            }
        } else {
            return {
                message: () => `O id de usuario não é um numero(${received.id})`,
                pass: false,
            }
        }
    }
});

describe('Testando controle de conta', () => {
    contasBoot.forEach(({ nome, sobreNome, email, senha }) => {
        it(`Testando login`, () => {
            
                expect(usuario).id();
            
        });
    });
}); 
 connection.end(); 

 function get({ tabela, buscar, configBusca, colunas, quantidade, ordem }) {

    const select = 'SELECT' + (colunas ? ' ' + colunas.join(', ') : ' *');
    const from = ` FROM ${tabela}`;

    // Configurando WHERE
    let where = '';
    if (buscar) {
        const arrayWhere = [];

        for (const coluna in buscar) {
            arrayWhere.push(`${coluna} = ?`);
        }

        where = ' WHERE ' + arrayWhere.join(' AND ');

    } else if (configBusca && configBusca.length > 0) {

        where = ' WHERE ' + configBusca.map(configuracao => {
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

    const query = select + from + where + orderBy + limit + ';';
    return query;
}
describe('Testando get', () => {
    it('SELECT item_id, item_name, item_quantidade FROM tb_testes WHERE ? > 2 AND ? =< 2 ORDER BY item_quantidade, item_name ASC LIMIT ?;', () => {
        expect(get(
            {
                tabela: 'tb_testes',
                configBusca: [
                    {
                        coluna: 'art_id',
                        operador: '>',
                        valor: 2
                    },
                    {
                        coluna: 'art_id',
                        operador: '=<',
                        valor: 2
                    },
                ],
                colunas: ['item_id', 'item_name', 'item_quantidade'],
                quantidade: 20,
                ordem: {
                    crescente: true,
                    ordenadores: ['item_quantidade', 'item_name']
                }
            })).toBe('SELECT item_id, item_name, item_quantidade FROM tb_testes WHERE art_id > ? AND art_id =< ? ORDER BY item_quantidade, item_name ASC LIMIT ?;');
    });
    it('SELECT item_id FROM tb_usuarios WHERE user_email = ? AND user_senha = ?";', () => {
        expect(get(
            {
                tabela: 'tb_usuarios',
                buscar: {
                    'user_email': 'www.seliganessa.com@gamil.com',
                    'user_senha': '40028922',
                },
                colunas: ['item_id']
            })).toBe('SELECT item_id FROM tb_usuarios WHERE user_email = ? AND user_senha = ?;');
    });
});

it('SELECT * FROM tb_artigos WHERE art_url = ?;', () => {
    expect(get({
        tabela: 'tb_artigos',
        configBusca: [
            {
                coluna: 'art_url',
                operador: '=',
                valor: 'meu-primeir-artigo-na-plataforma'
            }
        ]
    })).toBe('SELECT * FROM tb_artigos WHERE art_url = ?;');
});

it('SELECT art_url, art_resumo, art_titulo, user_id FROM tb_artigos WHERE art_id < ? LIMIT ?;', () => {
    expect(get({
        tabela: 'tb_artigos',
        configBusca: [
            {
                coluna: 'art_id',
                operador: '<',
                valor: 6
            }
        ],
        colunas: ['art_url', 'art_resumo', 'art_titulo', 'user_id'],
        quantidade: 5
    })).toBe('SELECT art_url, art_resumo, art_titulo, user_id FROM tb_artigos WHERE art_id < ? LIMIT ?;');
});

it('SELECT * FROM tb_usuarios WHERE user_email = ? AND user_senha = ? ORDER BY user_name, user_id, user_email DESC LIMIT ?;', () => {
    expect(get({
        tabela: 'tb_usuarios',
        configBusca: [
            {
                coluna: 'user_id',
                operador: '<',
                valor: 6
            },
            {
                coluna: 'user_name',
                operador: '=',
                valor: 'ghest'
            },
        ],
        buscar: {
            'user_email': 'www.seliganessa.com@gamil.com',
            'user_senha': '40028922',
        },
        quantidade: 5,
        ordem: {
            crescente: false,
            ordenadores: ['user_name', 'user_id', 'user_email']
        }
    })).toBe('SELECT * FROM tb_usuarios WHERE user_email = ? AND user_senha = ? ORDER BY user_name, user_id, user_email DESC LIMIT ?;');
}); */

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
    it('query para pegar produtos com quantidade igual a 7', () => {
        return bancoDeDados.get({
            tabela: 'tb_testes',
            buscar: {
                'item_quantidade': 7
            }
        }).then(dados => {
            expect(dados).toEqual([
                { 'item_id': 8, 'item_name': 'casaco', 'item_quantidade': 7 },
                { 'item_id': 9, 'item_name': 'maçam', 'item_quantidade': 7 },
            ]);
        });
    });
});
/**
 * query para pegar todos os produtos com quantidade menor igual a 5            | v
 * query para pegar a quantidade de sapatos                                     | V
 * query para pegar os 5 itens com id menor que 8 e que sejam diferentes de 5   | V
 * query para pegar produtos com quantidade igual a 7                           | O
 */
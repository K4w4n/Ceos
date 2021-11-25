/**
 * Objeto basico para identificar um erro.
 */
export class Erro {
    /**
     * @param {String} name Nome do erro
     * @param {Number} code Código do erro
     * @param {String} message Texto explicando o erro
     */
    constructor(name, code, message) {
        this.code = code;
        this.name = name;
        this.message = message;
    }
}
/**
 * @type {Erro[]}
 */
export const errorList = [
    new Erro('Url invalida', 0, 'Caracteres não permitidos na url'),
    new Erro('Url invalida', 1, 'A url precisa ser do tipo String'),
    new Erro('Url invalida', 2, 'A url precisa ter no minimo um caractere'),
    new Erro('Url invalida', 3, 'A url precisa ter todas as letras minusculas'),
    new Erro('Url invalida', 4, 'O unico caractere especial permitido é "-". Não são permitidos outros caracteres especiais e espaços'),
    new Erro('Url invalida', 5, 'A url não pode conter espaços, em vez disso utilize o simbolo de menos'),
    new Erro('Senha invalida', 6, 'A senha precisa ser uma string'),
    new Erro('Senha invalida', 7, 'A senha precisa ter no minimo 6 caracteres'),
    new Erro('Senha invalida', 8, 'A senha precisa ter no máximo 255 caracteres'),
    new Erro('Email invalido', 9, 'O email fornecido não esta em um formato valido'),
    new Erro('Nome invalido', 10, 'Nomes não podem conter numeros'),
    new Erro('Nome invalido', 11, 'O nome precisa ser fornecido'),
    new Erro('Email invalido', 12, 'O email precisa ser fornecido'),
    new Erro('Nome invalido', 13, 'O nome ultrapassa o tamanho maximo'),
    new Erro('Nome invalido', 14, 'O nome esta a baixo do tamanho minimo'),
    new Erro('Nome invalido', 15, 'Um nome não pode conter caracteres especiais'),//alguns nomes podem conter caracteres especiais
    new Erro('Sobrenome invalido', 16, 'O sobrenome ultrapassa o tamanho maximo'),
    new Erro('Sobrenome invalido', 17, 'O sobrenome esta a baixo do tamanho minimo'),
    new Erro('Sobrenome invalido', 18, 'O sobrenome precisa ser fornecido'),
    new Erro('Sobrenome invalido', 19, 'O sobrenome não pode conter caracteres especiais'), //alguns sobrenomes podem conter caracteres especiais
    new Erro('Sobrenome invalido', 20, 'O sobrenome não pode conter numeros'),
    new Erro('Url invalida', 21, 'O artigo procurado não existe ou foi removido'),
    new Erro('Falha no token', 22, 'O token esta vazio'),
    new Erro('Falha no token', 23, 'Algo deu errado no seu token, faça login novamente'),
    new Erro('Falha no Registro', 24, 'A conta já existe'),
];
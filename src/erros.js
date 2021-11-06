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
];
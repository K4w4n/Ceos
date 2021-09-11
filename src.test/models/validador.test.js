import Validador from '../../src/models/validador';
const validador = new Validador();

const emails = [
    {
        email: '',
        resultado: false
    },
    {
        email: 'www.seliganessa.com@gmail.com',
        resultado: true
    },
    {
        email: undefined,
        resultado: false
    },
    {
        email: null,
        resultado: false
    },
    {
        email: 0,
        resultado: false
    },
    {
        email: false,
        resultado: false
    },
    {
        email: 'emailerrado',
        resultado: false
    },
    {
        email: 'kawanaraujo@outlok.com',
        resultado: true
    },
    {
        email: 'email @dominio.com',
        resultado: false
    },
    {
        email: '111111@gmailcom',
        resultado: true
    },
    {
        email: '111111',
        resultado: false
    },
    {
        email: 'kawanaraujocontato@gmail.com',
        resultado: true
    },
];
describe('Testando Email', () => {
    emails.forEach((({ email, resultado }) => {
        it(email + '', () => {
            expect(validador.email(email)).toBe(resultado);
        });
    }));
});

const senhas = [
    {
        senha: '',
        resultado: false,
    },
    {
        senha: '0',
        resultado: false,
    },
    {
        senha: 'oi',
        resultado: false,
    },
    {
        senha: 'kawan12',
        resultado: false,
    },
    {
        senha: 'kawan123',
        resultado: true,
    },
    {
        senha: 'umasenhaum pouco mais longa e com espacos',
        resultado: true,
    },
    {
        senha: null,
        resultado: false,
    },
    {
        senha: undefined,
        resultado: false,
    },
    {
        senha: 0,
        resultado: false,
    },
    {
        senha: false,
        resultado: false,
    },
    {
        senha: true,
        resultado: false,
    },
];
describe('Testando Senha', () => {
    senhas.forEach(({ senha, resultado }) => {
        it('' + senha, () => {
            expect(validador.senha(senha)).toBe(resultado);
        });
    });
});
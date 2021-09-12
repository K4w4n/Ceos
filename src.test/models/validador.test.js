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
        it(`O email "${email}" espera o resultado ${resultado}`, () => {
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
        it(`A senha "${senha}" espera o resultado ${resultado}`, () => {
            expect(validador.senha(senha)).toBe(resultado);
        });
    });
});
const nomes = [
    {
        nome: '',
        resultado: false
    },
    {
        nome: 'a',
        resultado: false
    },
    {
        nome: null,
        resultado: false
    },
    {
        nome: undefined,
        resultado: false
    },
    {
        nome: 0,
        resultado: false
    },
    {
        nome: true,
        resultado: false
    },
    {
        nome: false,
        resultado: false
    },
    {
        nome: 'kawan',
        resultado: true
    },
    {
        nome: 'João vitor',
        resultado: true
    },
    {
        nome: 'João vitor5',
        resultado: false
    },
    {
        nome: '5kawan',
        resultado: false
    },
    {
        nome: '123456',
        resultado: false
    },
    {
        nome: 123456,
        resultado: false
    },
]
describe('Testando Nome', () => {
    nomes.forEach(({ nome, resultado }) => {
        it(`O nome "${nome}" espera o resultado ${resultado}`, () => {
            expect(validador.nome(nome)).toBe(resultado);
        });
    });
});

const sobreNomes = [
    {
        sobreNome: '',
        resultado: false
    },
    {
        sobreNome: 'a',
        resultado: false
    },
    {
        sobreNome: undefined,
        resultado: false
    },
    {
        sobreNome: null,
        resultado: false
    },
    {
        sobreNome: 55,
        resultado: false
    },
    {
        sobreNome: 'Gonsalves',
        resultado: true
    },
    {
        sobreNome: 'silva cardoso',
        resultado: true
    },
    {
        sobreNome: '232',
        resultado: false
    },
    {
        sobreNome: 'arauj0',
        resultado: false
    },
    {
        sobreNome: 'araújo',
        resultado: true
    },
    {
        sobreNome: 'Guimarães',
        resultado: true
    },
    {
        sobreNome: true,
        resultado: false
    },
    {
        sobreNome: false,
        resultado: false
    },
]
describe('Testando Nome', () => {
    sobreNomes.forEach(({ sobreNome, resultado }) => {
        it(`O nome "${sobreNome}" espera o resultado ${resultado}`, () => {
            expect(validador.sobrenome(sobreNome)).toBe(resultado);
        });
    });
});
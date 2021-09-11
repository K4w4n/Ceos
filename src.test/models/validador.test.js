import Validador from '../../src/models/validador';
const validador = new Validador();
const emailsEResults = [
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
    emailsEResults.forEach((({ email, resultado }) => {
        it(email + '', () => {
            expect(validador.email(email)).toBe(resultado);
        });
    }));
});
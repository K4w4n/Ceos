import ControleConta from "../../src/models/controleConta";
import { connection } from "../../src/models/conectionMysql";
import Validador from "../../src/models/validador";

const validador = new Validador();
const controleConta = new ControleConta(connection, validador);

expect.extend({
    id(received, argument) {
        console.log(received, argument);
        if (typeof received.id == 'number') {
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

const contasBoot = [
    {
        email: 'juliobeneditodarocha_@land.com.br',
        senha: 'BWnwkssbXB',
    },
];
describe('Testando controle de conta', () => {
    contasBoot.forEach(({ nome, sobreNome, email, senha }) => {
        it(`Testando login`, () => {
            return controleConta.facaLogin(email, senha).then((usuario) => {
                expect(usuario).id();
            });
        });
    });
});
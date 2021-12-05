const loginBtn = document.querySelector('.login');
const registroBtn = document.querySelector('.registro');
const signInForm = document.querySelector('.sign-in-form');
const signUpForm = document.querySelector('.sign-up-form');
const signUpBtn = document.querySelector('#sign-up-btn');;
const signInBtn = document.querySelector('#sign-in-btn');;

const emailLogin = signInForm.querySelector('.email');
const senhaLogin = signInForm.querySelector('.senha');

const nomeRegistro = signUpForm.querySelector('.nome');
const sobrenomeRegistro = signUpForm.querySelector('.sobrenome');
const emailRegistro = signUpForm.querySelector('.email');
const senhaRegistro = signUpForm.querySelector('.senha1');
const confirmSenhaRegistro = signUpForm.querySelector('.senha2');
const aceitarTermosRegistro = signUpForm.querySelector('.aceitar-termos');

const labelErroLogin = signInForm.querySelector('.label-erros-login');
const labelErroRegistro = signUpForm.querySelector('.label-erros-login');

const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regNumero = /[0-9]/;

const goHtml = (el, child) => el.innerHTML = child;
const goInput = (el, value) => el.value = value;

const btnLogin = {
    active: () => loginBtn.disabled = false,
    desable: () => loginBtn.disabled = true,
}
const btnRegistro = {
    active: () => registroBtn.disabled = false,
    desable: () => registroBtn.disabled = true,
}

loginBtn.addEventListener('click', () => {
    const email = emailLogin.value;
    const senha = senhaLogin.value;
    apiCeos.usuario.login(email, senha)
        .then(() => window.location.reload())
        .catch(erro => {
            goHtml(labelErroLogin, erro.message);
            btnLogin.desable();
        });
});
registroBtn.addEventListener('click', () => {
    const nome = nomeRegistro.value;
    const sobrenome = sobrenomeRegistro.value;
    const email = emailRegistro.value;
    const senha = senhaRegistro.value;
    apiCeos.usuario.registro(nome, sobrenome, email, senha)
        .then(() => window.location.reload())
        .catch(erro => {
            console.log(erro);
            goHtml(labelErroRegistro, erro.message);
            btnRegistro.desable();
        });
});

function validLogin() {
    const email = emailLogin.value;
    const senha = senhaLogin.value;
    if (!email) {
        btnLogin.desable();
        goHtml(labelErroLogin, 'O E-mail está vazio');
    } else if (!regEmail.test(email)) {
        btnLogin.desable();
        goHtml(labelErroLogin, 'E-mail inválido');
    } else if (!senha) {
        btnLogin.desable();
        goHtml(labelErroLogin, 'A Senha esta vazia');
    } else if (senha.length < 6) {
        btnLogin.desable();
        goHtml(labelErroLogin, 'A Senha é muito curta');
    } else if (senha.length > 255) {
        btnLogin.desable();
        goHtml(labelErroLogin, 'A Senha é muito longa');
    } else {
        btnLogin.active();
        goHtml(labelErroLogin, '');
        console.log('tudo valido');
    }
}

function validRegistro() {
    const nome = nomeRegistro.value;
    const sobrenome = sobrenomeRegistro.value;
    const email = emailRegistro.value;
    const senha = senhaRegistro.value;
    const confirmSenha = confirmSenhaRegistro.value;
    if (!nome) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'Insira o Nome');
    } else if (regNumero.test(nome)) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'O Nome não deve ter números');
    } else if (nome.length < 3) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'O Nome é muito curto');
    } else if (nome.length > 35) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'O Nome é muito longo');
    } else if (!sobrenome) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'Insira o Sobrenome');
    } else if (regNumero.test(sobrenome)) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'O Sobrenome não deve ter números');
    } else if (sobrenome.length < 3) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'O Sobrenome é muito curto');
    } else if (sobrenome.length > 35) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'O Sobrenome é muito longo');
    } else if (!email) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'Insira o E-mail');
    } else if (!regEmail.test(email)) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'E-mail inválido');
    } else if (!senha) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'Insira a Senha');
    } else if (senha.length < 6) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'A Senha é muito curta');
    } else if (senha.length > 255) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'A Senha é muito longa');
    } else if (!confirmSenha) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'Confirme a Senha');
    } else if (senha != confirmSenha) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'As Senhas devem ser iguais');
    } else if (!aceitarTermosRegistro.checked) {
        btnRegistro.desable();
        goHtml(labelErroRegistro, 'Aceite os Termos');
    } else {
        btnRegistro.active();
        goHtml(labelErroRegistro, '');
    }
    /* if (!(senha == confirmSenha)) throw new Error("Senha invalida"); */
}

/* Adcionando eventos em login*/
emailLogin.addEventListener('keyup', validLogin);
emailLogin.addEventListener('keydown', validLogin);

senhaLogin.addEventListener('keyup', validLogin);
senhaLogin.addEventListener('keydown', validLogin);

/* Adcionando eventos em registro*/
nomeRegistro.addEventListener('keyup', validRegistro);
nomeRegistro.addEventListener('keydown', validRegistro);

sobrenomeRegistro.addEventListener('keyup', validRegistro);
sobrenomeRegistro.addEventListener('keydown', validRegistro);

emailRegistro.addEventListener('keyup', validRegistro);
emailRegistro.addEventListener('keydown', validRegistro);

senhaRegistro.addEventListener('keyup', validRegistro);
senhaRegistro.addEventListener('keydown', validRegistro);

confirmSenhaRegistro.addEventListener('keyup', validRegistro);
confirmSenhaRegistro.addEventListener('keydown', validRegistro);

aceitarTermosRegistro.addEventListener('click', validRegistro);
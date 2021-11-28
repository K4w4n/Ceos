const loginBtn = document.querySelector('.login');
const registroBtn = document.querySelector('.registro');
const signInForm = document.querySelector('.sign-in-form');
const signUpForm = document.querySelector('.sign-up-form');

const emailLogin = signInForm.querySelector('.email');
const senhaLogin = signInForm.querySelector('.senha');

const nomeRegistro = signUpForm.querySelector('.nome');
const sobrenomeRegistro = signUpForm.querySelector('.sobrenome');
const emailRegistro = signUpForm.querySelector('.email');
const senhaRegistro = signUpForm.querySelector('.senha1');
const confirmSenhaRegistro = signUpForm.querySelector('.senha2');

/* const input = document.querySelector() */
loginBtn.addEventListener('click', async () => {
    const email = emailLogin.value;
    const senha = senhaLogin.value;
    await apiCeos.usuario.login(email, senha);
    window.location.reload();
});
registroBtn.addEventListener('click', async () => {
    const nome = nomeRegistro.value;
    const sobrenome = sobrenomeRegistro.value;
    const email = emailRegistro.value;
    const senha = senhaRegistro.value;
    const confirmSenha = confirmSenhaRegistro.value;

    if (!(senha == confirmSenha)) throw new Error("Senha invalida");
    await apiCeos.usuario.registro(nome, sobrenome, email, senha);
    window.location.reload();
});
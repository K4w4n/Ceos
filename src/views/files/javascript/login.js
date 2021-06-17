const login = document.querySelector('.login');
const registro = document.querySelector('.registro');

login.addEventListener('click', () => {
    const email = document.querySelector('#email2').value.trim();
    const senha = document.querySelector('#senha2').value;
    apiCeos.user.login(email, senha, (dados) => {
        if (dados.status.sucesso) {
            alert('Logado');
        } else {
            alert('Erro ao fazer login');
        }
    });
});
registro.addEventListener('click', () => {
    //selecionar dados
    const nome = document.querySelector('#nome').value.trim();
    const sobrenome = document.querySelector('#sobrenome').value.trim();
    const email = document.querySelector('#email').value.trim();
    const senha = document.querySelector('#senha').value;
    //validar
    apiCeos.user.registre(nome, sobrenome, email, senha, (dados) => {
        if (dados.status.sucesso) {
            apiCeos.user.login(email, senha, (dados) => {
                if (dados.status.sucesso) {
                    //login funcionou
                    alert('Conta criada, aguarde até a implementação de novos recursos!');
                } else {
                    //login não funcionou
                    alert('Voce foi registrado mas algo deu errado, por favor tente novamente em "Login"');
                }
            });
        } else {
            //erro ao cadastrar
            alert('Erro ao cadastrar');
        }
    });
});
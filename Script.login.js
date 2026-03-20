// Controle dos campos de usuario e senha e botão "fazer login"
const inputUsuario = document.querySelector('#email');
const inputSenha = document.querySelector('#senha');
const btnLogin = document.querySelector('.fazer-login');
const divMensagem = document.querySelector('#mensagem-alerta');

function verificarEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        btnLogin.click();
    }
}

// Fica aguardando o botão "enter"
inputUsuario.addEventListener('keydown', verificarEnter);
inputSenha.addEventListener('keydown', verificarEnter);

// Gatilho que é disparado ao clicar no botão "fazer login"
btnLogin.addEventListener('click', function () {

    const usuarioDigitado = inputUsuario.value;
    const senhaDigitada = inputSenha.value;
    divMensagem.className = 'mensagem-oculta';

    // Fazendo verificação dos dados de acesso
    if (usuarioDigitado === '' || senhaDigitada === '') {
        divMensagem.textContent = 'Por favor, preencha todos os campos!';
        divMensagem.classList.add('mensagem-erro');

    } else if (usuarioDigitado === 'nextshape@gmail.com' && senhaDigitada === '123456') {
        divMensagem.textContent = 'Login aprovado! Bem-vindo, NextShape.';
        divMensagem.classList.add('mensagem-sucesso');

        setTimeout(function () {
            window.location.href = 'index.html';
        }, 2000);

    } else {
        divMensagem.textContent = 'Usuário ou senha incorretos.';
        divMensagem.classList.add('mensagem-erro');
    }
});
/*Mudando Forms do Login*/
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


/*Permissao para visualizar Senha*/
function show() {
  var senha = document.getElementById("senha");
  if (senha.type === "password") {
    senha.type = "text";
  let lock = document.getElementById('lock');
  lock.classList.remove('fa-eye-slash');
  lock.classList.add('fa-eye');
  } else {
    senha.type = "password";
    let lock = document.getElementById('lock');
    lock.classList.remove('fa-eye');
    lock.classList.add('fa-eye-slash');
  }

}

function show1() {
  var senha = document.getElementById("senha1");
  if (senha.type === "password") {
    senha.type = "text";
  let lock = document.getElementById('lock1');
  lock.classList.remove('fa-eye-slash');
  lock.classList.add('fa-eye');
  } else {
    senha.type = "password";
    let lock = document.getElementById('lock1');
    lock.classList.remove('fa-eye');
    lock.classList.add('fa-eye-slash');
  }

}

function animation_lock(){
  var valor_input = document.getElementById('senha').value;
  var cadeado = document.getElementById('lock');
  if (valor_input == '' ){
  let cadeado = document.getElementById('lock');
  cadeado.classList.remove('fa-lock');
  cadeado.classList.add('fa-eye-slash');
  return false;
  }

}


function animation_lock1(){
  var valor_input = document.getElementById('senha1').value;
  var cadeado1 = document.getElementById('lock1');
  if (valor_input == '' ){
  let cadeado1 = document.getElementById('lock1');
  cadeado1.classList.remove('fa-lock');
  cadeado1.classList.add('fa-eye-slash');
  
  return false
  }

}

document.getElementById('email').focus();
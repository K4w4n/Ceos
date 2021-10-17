/*Aparecer e Desaparecer Menu*/
let navbar = document.querySelector('nav');
var scrollPrev = window.pageYOffset;
window.onscroll = function () {
  var scrollCur = window.pageYOffset;
  if (scrollPrev > scrollCur) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px";

  }
  scrollPrev = scrollCur;
}

/*Botao Retornar ao Topo da Pagina*/
const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) {
    if (!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else {
    if (backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function () {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
};

/*Limitando Numeros de Caracteres por Artigo*/
function limite_textarea(valor) {
  quant = 5000;
  total = valor.length;
  if (total <= quant) {
    resto = quant - total;
    document.getElementById('cont').innerHTML = resto;
  } else {
    document.getElementById('texto').value = valor.substr(0, quant);
  }
  if (total = quant) {
    document.getElementById()
  }
}
/* Connectando back-end */
const homeItemHtml = document.querySelector('.home-item');
const artigosMenuItemHtml = document.querySelector('.artigos-menu-item');
const sobreItemHtml = document.querySelector('.sobre-item');
const painelItemHtml = document.querySelector('.painel-item');
const loginItem = document.querySelector('.login-item');
const perfilItem = document.querySelector('.perfil-item');
const sairItem = document.querySelector('.sair-item');
const navbar = document.querySelector('nav');

const apiCeos = new ApiCeos();
if (navbar) apiCeos.usuario.subscribe((usuario) => {
    painelItemHtml.style.display = 'block';
    loginItem.style.display = 'none';
    perfilItem.style.display = 'block';
    sairItem.style.display = 'block';
});

/* botão sair */
if (sairItem) sairItem.addEventListener('click', async() => {
    await apiCeos.usuario.logoff();
    window.location.href = "/login";
});
/*Aparecer e Desaparecer Menu*/
var scrollPrev = window.pageYOffset;
window.onscroll = function() {
    var scrollCur = window.pageYOffset;
    if (scrollPrev > scrollCur) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-80px";

    }
    scrollPrev = scrollCur;
}

/*Scroll Continuo*/
window.addEventListener('scroll', handleScroll);

function handleScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    document.getElementById("progressbar").style.height = scrolled + "%";
}

/*Botao Retornar ao Topo da Pagina*/
const backToTopButton = document.querySelector("#back-to-top-btn");

if (backToTopButton) window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.pageYOffset > 300) {
        if (!backToTopButton.classList.contains("btnEntrance")) {
            backToTopButton.classList.remove("btnExit");
            backToTopButton.classList.add("btnEntrance");
            backToTopButton.style.display = "block";
        }
    } else {
        if (backToTopButton.classList.contains("btnEntrance")) {
            backToTopButton.classList.remove("btnEntrance");
            backToTopButton.classList.add("btnExit");
            setTimeout(function() {
                backToTopButton.style.display = "none";
            }, 250);
        }
    }
}

if (backToTopButton) backToTopButton.addEventListener("click", smoothScrollBackToTop);

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
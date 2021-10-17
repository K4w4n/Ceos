const theme = localStorage.getItem("Theme")
if (theme == "dark") darktheme_artigo_completo();
else lightheme_artigo_completo();

const temaButton = document.querySelectorAll('.theme');
const escuro = temaButton[0];
const claro = temaButton[1];
escuro.addEventListener('click', darktheme_artigo_completo);
claro.addEventListener('click', lightheme_artigo_completo);
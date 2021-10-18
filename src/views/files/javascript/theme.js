/*Dark Index*/
function darktheme_index() {
  localStorage.setItem('Theme', 'dark');

  let body_dark = document.getElementById('body');
  body_dark.classList.remove('body-light');
  body_dark.classList.add('body-dark');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper');
  wrapper_dark.classList.add('wrapper-dark');

  let check_dark = document.getElementById('check-dark');
  check_dark.classList.remove('#');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-light');
  check_light.classList.remove('fa-check');
}

/*Dark Artigos*/
function darktheme_artigos() {
  localStorage.setItem('Theme', 'dark');

  let body_dark = document.getElementById('body');
  body_dark.classList.remove('body-light');
  body_dark.classList.add('body-dark');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper');
  wrapper_dark.classList.add('wrapper-dark');

  let back_to_top = document.getElementById('back-to-top-btn');
  back_to_top.classList.remove('back-to-top-btn');
  back_to_top.classList.add('back-to-top-btn-dark');

  let check_dark = document.getElementById('check-dark');
  check_dark.classList.remove('#');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-light');
  check_light.classList.remove('fa-check');
}

/*Dark Artigo Completo*/
function darktheme_artigo_completo() {
  localStorage.setItem('Theme', 'dark');

  let body_dark = document.getElementById('body');
  body_dark.classList.remove('body-light');
  body_dark.classList.add('body-dark');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper');
  wrapper_dark.classList.add('wrapper-dark');

  let container_artigo_completo = document.getElementById('container_artigo_completo');
  container_artigo_completo.classList.remove('container-artigo-completo');
  container_artigo_completo.classList.add('container-artigo-completo-dark');

  let title_artigo_completo = document.getElementById('title_artigo_completo');
  title_artigo_completo.classList.remove('title-artigo-completo');
  title_artigo_completo.classList.add('title-artigo-completo-dark');

  let subtitle_artigo_completo = document.getElementById('subtitle_artigo_completo');
  subtitle_artigo_completo.classList.remove('subtitle-artigo-completo');
  subtitle_artigo_completo.classList.add('subtitle-artigo-completo-dark');

  let text_artigo_completo = document.getElementById('text_artigo_completo');
  text_artigo_completo.classList.remove('text-artigo-completo');
  text_artigo_completo.classList.add('text-artigo-completo-dark');

  let back_to_top = document.getElementById('back-to-top-btn');
  back_to_top.classList.remove('back-to-top-btn');
  back_to_top.classList.add('back-to-top-btn-dark');

  let check_dark = document.getElementById('check-dark');
  check_dark.classList.remove('#');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-light');
  check_light.classList.remove('fa-check');
}

/*Dark Sobre*/
function darktheme_sobre() {
  localStorage.setItem('Theme', 'dark');

  let body_dark = document.getElementById('body');
  body_dark.classList.remove('body-light');
  body_dark.classList.add('body-dark');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper');
  wrapper_dark.classList.add('wrapper-dark');

  let check_dark = document.getElementById('check-dark');
  check_dark.classList.remove('#');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-light');
  check_light.classList.remove('fa-check');
}

/*Dark Painel*/
function darktheme_painel() {
  localStorage.setItem('Theme', 'dark');

  let body_dark = document.getElementById('body');
  body_dark.classList.remove('body-light');
  body_dark.classList.add('body-dark');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper');
  wrapper_dark.classList.add('wrapper-dark');

  let title = document.getElementById('title');
  title.classList.remove('title-painel');
  title.classList.add('title-painel-dark');

  let texto = document.getElementById('texto');
  texto.classList.remove('textarea');
  texto.classList.add('textarea-dark');

  let link = document.getElementById('link');
  link.classList.remove('link');
  link.classList.add('link-dark');

  let title_link = document.getElementById('title-link');
  title_link.classList.remove('title-link');
  title_link.classList.add('title-link-dark');

  let cod = document.getElementById('cod');
  cod.classList.remove('cod');
  cod.classList.add('cod-dark');

  let extension = document.getElementById('extension');
  extension.classList.remove('extension');
  extension.classList.add('extension-dark');

  let check_dark = document.getElementById('check-dark');
  check_dark.classList.remove('#');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-light');
  check_light.classList.remove('fa-check');
}

/*Dark Login*/
function darktheme_login() {
  localStorage.setItem('Theme', 'dark');

  let body_dark = document.getElementById('body');
  body_dark.classList.remove('body-light');
  body_dark.classList.add('body-dark');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper');
  wrapper_dark.classList.add('wrapper-dark');

  let container = document.getElementById('container');
  container.classList.remove('container');
  container.classList.add('container-dark');

  let title = document.getElementById('title');
  title.classList.remove('title');
  title.classList.add('title-dark');

  let title1 = document.getElementById('title1');
  title1.classList.remove('title');
  title1.classList.add('title-dark');

  let check_dark = document.getElementById('check-dark');
  check_dark.classList.remove('#');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-light');
  check_light.classList.remove('fa-check');
}

/*Light Index*/
function lightheme_index() {
  localStorage.setItem('Theme', 'light');

  let light = document.getElementById('body');
  light.classList.remove('body-dark');
  light.classList.add('body-light');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper-dark');
  wrapper_dark.classList.add('wrapper');

  let check_dark = document.getElementById('check-light');
  check_dark.classList.remove('fa-check');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-dark');
  check_light.classList.remove('fa-check');
}

/*Light Artigos*/
function lightheme_artigos() {
  localStorage.setItem('Theme', 'light');

  let light = document.getElementById('body');
  light.classList.remove('body-dark');
  light.classList.add('body-light');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper-dark');
  wrapper_dark.classList.add('wrapper');

  let back_to_top = document.getElementById('back-to-top-btn');
  back_to_top.classList.remove('back-to-top-btn-dark');
  back_to_top.classList.add('back-to-top-btn');

  let check_dark = document.getElementById('check-light');
  check_dark.classList.remove('fa-check');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-dark');
  check_light.classList.remove('fa-check');
}

/*Light Artigo Completo*/
function lightheme_artigo_completo() {
  localStorage.setItem('Theme', 'light');

  let body_dark = document.getElementById('body');
  body_dark.classList.remove('body-dark');
  body_dark.classList.add('body-light');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper-dark');
  wrapper_dark.classList.add('wrapper');

  let container_artigo_completo = document.getElementById('container_artigo_completo');
  container_artigo_completo.classList.remove('container-artigo-completo-dark');
  container_artigo_completo.classList.add('container-artigo-completo');

  let title_artigo_completo = document.getElementById('title_artigo_completo');
  title_artigo_completo.classList.remove('title-artigo-completo-dark');
  title_artigo_completo.classList.add('title-artigo-completo');

  let subtitle_artigo_completo = document.getElementById('subtitle_artigo_completo');
  subtitle_artigo_completo.classList.remove('subtitle-artigo-completo-dark');
  subtitle_artigo_completo.classList.add('subtitle-artigo-completo');

  let text_artigo_completo = document.getElementById('text_artigo_completo');
  text_artigo_completo.classList.remove('text-artigo-completo-dark');
  text_artigo_completo.classList.add('text-artigo-completo');

  let back_to_top = document.getElementById('back-to-top-btn');
  back_to_top.classList.remove('back-to-top-btn-dark');
  back_to_top.classList.add('back-to-top-btn');

  let check_dark = document.getElementById('check-light');
  check_dark.classList.remove('fa-check');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-dark');
  check_light.classList.remove('fa-check');
}

/*Light Sobre*/
function lightheme_sobre() {
  localStorage.setItem('Theme', 'light');

  let light = document.getElementById('body');
  light.classList.remove('body-dark');
  light.classList.add('body-light');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper-dark');
  wrapper_dark.classList.add('wrapper');

  let check_dark = document.getElementById('check-light');
  check_dark.classList.remove('fa-check');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-dark');
  check_light.classList.remove('fa-check');
}

/*Light Painel*/
function lightheme_painel() {
  localStorage.setItem('Theme', 'light');

  let light = document.getElementById('body');
  light.classList.remove('body-dark');
  light.classList.add('body-light');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper-dark');
  wrapper_dark.classList.add('wrapper');

  let title = document.getElementById('title');
  title.classList.remove('title-painel-dark');
  title.classList.add('title-painel');

  let texto = document.getElementById('texto');
  texto.classList.remove('textarea-dark');
  texto.classList.add('textarea');

  let link = document.getElementById('link');
  link.classList.remove('link-dark');
  link.classList.add('link');

  let title_link = document.getElementById('title-link');
  title_link.classList.remove('title-link-dark');
  title_link.classList.add('title-link');

  let cod = document.getElementById('cod');
  cod.classList.remove('cod-dark');
  cod.classList.add('cod');

  let extension = document.getElementById('extension');
  extension.classList.remove('extension-dark');
  extension.classList.add('extension');

  let check_dark = document.getElementById('check-light');
  check_dark.classList.remove('fa-check');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-dark');
  check_light.classList.remove('fa-check');
}

/*Light Login*/
function lightheme_login() {
  localStorage.setItem('Theme', 'light');

  let light = document.getElementById('body');
  light.classList.remove('body-dark');
  light.classList.add('body-light');

  let wrapper_dark = document.getElementById('wrapper');
  wrapper_dark.classList.remove('wrapper-dark');
  wrapper_dark.classList.add('wrapper');

  let container = document.getElementById('container');
  container.classList.remove('container-dark');
  container.classList.add('container');

  let title = document.getElementById('title');
  title.classList.remove('title-dark');
  title.classList.add('title');

  let title1 = document.getElementById('title1');
  title1.classList.remove('title-dark');
  title1.classList.add('title');

  let check_dark = document.getElementById('check-light');
  check_dark.classList.remove('fa-check');
  check_dark.classList.add('fa-check');

  let check_light = document.getElementById('check-dark');
  check_light.classList.remove('fa-check');
}
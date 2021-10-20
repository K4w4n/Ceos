import React from 'react';
module.exports = ({ titulo, conteudo, dataPublicacao, autorNome, autorSobrenome }) => {
    const paragrafos = conteudo ? conteudo.split("\n") : ['Sem conteudo'];
    const paragrafosHTML = paragrafos.map(p => <p key={Math.random()}>{p}</p>);
    return <html lang="PT-BR">
        <head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
            <script src="https://kit.fontawesome.com/7ca743346d.js" crossOrigin="anonymous"></script>
            <link rel="stylesheet" href="/files/css/main.css" />
            <link rel="stylesheet" href="/files/css/main_dark.css" />
            <link rel="stylesheet" href="/files/css/artigos_completos.css" />
            <link rel="icon" type="image/png" href="/files/img/favicon.png" />
            <title>{`${titulo} • ${autorNome} ${autorSobrenome}`}</title>
        </head>

        <body className="body-light" id="body">
            <div className="wrapper" id="wrapper">
                <nav>
                    <input type="checkbox" id="show-search" />
                    <input type="checkbox" id="show-menu" />
                    <label htmlFor="show-menu" className="menu-icon"><i className="fas fa-bars"></i></label>
                    <div className="content">
                        <div className="logo"><a href="index.html"><img src="/files/img/logo1.png" className="logotipo" /></a></div>
                        <ul className="links">
                            <li><a href="/index.html">Home</a></li>
                            <li><a href="/artigos.html">Artigos</a></li>
                            <li><a href="/sobre.html">Sobre Nós</a></li>
                            <li><a href="/painel.html">Painel</a></li>
                            <li>
                                <a href="" className="desktop-link">Perfil <i className="fas fa-angle-down"></i></a>
                                <input type="checkbox" id="show-features" />
                                <label htmlFor="show-features">Perfil <i className="fas fa-angle-down"></i></label>
                                <ul id="dropdown">
                                    <li><a href="login.html"><i className="fas fa-user-circle"></i><span className="text-submenu">Perfil</span></a>
                                    </li>
                                    <li><a href="#"><i className="fas fa-newspaper"></i><span className="text-submenu">Meus Artigos</span></a></li>
                                    <li><a href="#"><i className="fas fa-sign-out-alt"></i><span className="text-submenu">Sair</span></a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="desktop-link">Aparência <i className="fas fa-angle-down"></i></a>
                                <input type="checkbox" id="show-features1" />
                                <label htmlFor="show-features1">Aparência <i className="fas fa-angle-down"></i></label>
                                <ul>
                                    <li><button onClick={e => darktheme_artigo_completo()} className="theme"><i className="fas fa-moon"></i>
                                        <div className="text-dark">Tema Escuro <i id="check-dark" className="fas #"></i></div>
                                    </button></li>
                                    <li><button onClick={e => lightheme_artigo_completo()} className="theme"><i className="fas fa-sun"></i>
                                        <div className="text-dark">Tema Claro <i id="check-light" className="fas fa-check"></i></div>
                                    </button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <label htmlFor="show-search" className="search-icon"><i className="fas fa-search"></i></label>
                    <form action="#" className="search-box">
                        <input type="text" placeholder="Pesquisar..." required />
                        <button type="submit" className="go-icon"><i className="fas fa-long-arrow-alt-right"></i></button>
                    </form>
                </nav>
            </div >

            <div className="btn">
                <a href="/artigos.html"><button className="btn-voltar"><span>Voltar</span></button></a>
            </div>

            <div className="container-artigo-completo" id="container_artigo_completo">
                <label className="title-artigo-completo" id="title_artigo_completo">{titulo}</label>

                <label className="subtitle_artigo_completo" id="subtitle_artigo_completo">{autorNome} {autorSobrenome} • {dataFormatada(dataPublicacao)}</label>

                <span className="text-artigo-completo" id="text_artigo_completo">
                    {paragrafosHTML}
                </span>
            </div>

            <button id="back-to-top-btn" className="back-to-top-btn"><i className="fas fa-angle-double-up"></i></button>

            <script src="/files/javascript/main.js"></script>
            <script src="/files/javascript/theme.js"></script>

            <script src="/files/javascript/theme-artigo.js"></script>
        </body >
    </html >
}
function dataFormatada(data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
}
import React from 'react';
module.exports = (data) => {
    const paragrafos = data.conteudo.split("\n");
    const paragrafosHTML = paragrafos.map(p => <p align="justify">{p}</p>);

    return <html lang="pt-br">
        <head>
            <meta charset="utf-8" />
            <title>{`${data.titulo} - ${data.nomeAutor} ${data.sobrenomeAutor}`}</title>
            <link rel="stylesheet" href="/files/css/estiloProvisorio.css" />
        </head>
        <body>
            <h1>
                {data.titulo}
            </h1>
            {paragrafosHTML}
            <label>
                {data.dataPublicacao + ''}
            </label>
            <br />
            <label>
                Escrito por: {data.voceEscritor ? 'Voce' : data.nomeAutor + ' ' + data.sobrenomeAutor}
            </label>
        </body>
    </html>
};
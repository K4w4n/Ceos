import React from 'react';
module.exports = (data) => {
    const paragrafos = data.conteudo ? data.conteudo.split("\n") : ['Sem conteudo'];
    const paragrafosHTML = paragrafos.map(p => <p align="justify">{p}</p>);

    return <html lang="pt-br">
        <head>
            <meta charset="utf-8" />
            <title>{`${data.titulo || 'Sem titulo'} - ${data.nomeAutor} ${data.sobrenomeAutor}`}</title>
            <link rel="stylesheet" href="/files/css/estiloProvisorio.css" />
        </head>
        <body>
            <h1>
                {data.titulo || 'Sem titulo'}
            </h1>
            {paragrafosHTML}
            <label>
                {data.dataPublicacao + ''}
            </label>
            <br />
            <label>
                Escrito por: { data.nomeAutor + ' ' + data.sobrenomeAutor}
            </label>
        </body>
    </html>
};
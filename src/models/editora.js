exports.editora = {
    crieArtigo(urlArtigo, credencialCodigo, callBack) {
        if (!callBack) {
            return;
        }
        controleConta.confirmeChaveCredencial(credencialId, (msgData) => {
            if (!msgData.status.sucesso) {
                callBack(msgData);
                return;
            }
            connection.query('SELECT COUNT(artId) FROM tbArtigos WHERE artId = ?', [idArtigo], (err, results, fields) => {
                if (!err) {
                    if (!results[0]['COUNT(artId)']) {
                        connection.query('INSERT INTO tbArtigos(artId, artTitulo, artConteudo, artDataPublicação) VALUES (?,?,?,?)',
                            [idArtigo, 'Simple title', 'Simple text', dataFormatadaMysql(new Date())],
                            (err, results) => {
                                if (!err) {

                                    connection.query('SELECT COUNT(userId) from tbEscritores WHERE ? = credencialId',
                                        [credencialId], (err, results) => {
                                            if (!err) {
                                                connection.query('INSERT INTO tbEscritores(userID, artId) VALUES (?,?)',
                                                    [idArtigo], (err) => {
                                                        callBack(new Mensagem(new Status('Erro inesperado', false)));
                                                        return
                                                    })

                                                callBack(new Mensagem(new Status('Artigo criado com sucesso.', true),
                                                    new Artigo(idArtigo, 'Simple title', 'Simple text', dataFormatadaMysql(new Date()))));
                                            } else {
                                                callBack(new Mensagem(new Status('Erro ao localizar usuario', false)));
                                                return
                                            }
                                        });

                                } else {
                                    callBack(new Mensagem(new Status('Erro inesperado', false)));
                                }
                            });
                    } else {
                        callBack(new Mensagem(new Status('Código para a Url já esta em uso.', false)));
                    }
                } else {
                    callBack(new Mensagem(new Status('Erro inesperado', false)));
                }

            });
        });

    },
    deleteArtigo(idArtigo, callBack) { },
    editeArtigo(idArtigo, alteracoes, callBack) { }
}

function dataFormatadaMysql(data) {
    const dia = data.getDate().toString();
    const diaF = (dia.length == 1) ? '0' + dia : dia;
    const mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth() Janeiro começa com zero.
    const mesF = (mes.length == 1) ? '0' + mes : mes;
    const anoF = data.getFullYear();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundos = data.getSeconds();
    return anoF + "-" + mesF + "-" + diaF + " " + hora + ":" + minuto + ":" + segundos;
}
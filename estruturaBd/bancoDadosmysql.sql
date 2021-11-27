CREATE USER 'app'@'localhost' IDENTIFIED BY 'z&Y2pyUvys4fIAy*r$AFgbPnZSD';

CREATE DATABASE db_ceos;
USE db_ceos;

CREATE TABLE tb_usuarios(
    user_id INT NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(320) NOT NULL UNIQUE,
    user_nome VARCHAR(35) NOT NULL,
    user_sobrenome VARCHAR(35) NOT NULL,
    user_senha VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE tb_artigos(
    art_id INT NOT NULL AUTO_INCREMENT,
    art_url VARCHAR(250) NOT NULL UNIQUE,
    art_conteudo TEXT,
    art_titulo VARCHAR(200),
	user_id INT NOT NULL,
    art_data_publicacao TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	FOREIGN KEY(user_id) REFERENCES tb_usuarios(user_id),
    PRIMARY KEY(art_id)
);
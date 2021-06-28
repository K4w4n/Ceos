CREATE USER 'app'@'localhost' IDENTIFIED BY '1RP9n3yCi&Y8jpdD2PLf@g@%^LKu5tVcQSL&4ASeSOpt%4UoHe';

CREATE DATABASE db_ceos;
USE db_ceos;

CREATE TABLE tb_usuarios(
    user_Id INT NOT NULL AUTO_INCREMENT,
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

CREATE TABLE tb_credenciais(
    credencial_id INT NOT NULL AUTO_INCREMENT,
    credencial_cod CHAR(8) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    PRIMARY KEY(credencial_id),
    FOREIGN KEY(user_id) REFERENCES tb_usuarios(user_id)
);

/*----------------------------Registro------------------------------------------*/
DELIMITER $$
CREATE PROCEDURE pro_registro(userEmail VARCHAR(320), userSenha VARCHAR(255), userNome VARCHAR(35), userSobrenome VARCHAR(35))
    BEGIN
        /*Validar dados*/
        DECLARE erro BOOLEAN default false;
        DECLARE numero_contas_com_email  INT;
        SET erro = (userEmail is null OR userEmail like '') OR (userNome is null OR userNome like '') OR (userSobrenome is null OR userSobrenome like '') OR (CHAR_LENGTH(userSenha) < 8);
        IF erro THEN
			SIGNAL SQLSTATE '45000' SET message_text = 'Erro com os dados';
            ROLLBACK;
        ELSE
            START TRANSACTION;
            SET numero_contas_com_email = (SELECT  COUNT(*) FROM tb_usuarios WHERE  user_email= userEmail);
            IF numero_contas_com_email>0 THEN
				SIGNAL SQLSTATE '45000' SET message_text = 'Email ja existe';
            ELSE
                INSERT INTO tb_usuarios(user_email, user_nome, user_sobrenome, user_senha)
                VALUES (userEmail, userNome, userSobrenome, userSenha);
            END IF;
        COMMIT;
    END IF;
END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_registro TO 'app'@'localhost';
/*----------------------------Login------------------------------------------*/
USE db_ceos;
DELIMITER $$
CREATE PROCEDURE pro_login(userEmail VARCHAR(320), userSenha VARCHAR(255))
	BEGIN
		/*Declarando variaveis*/
        DECLARE erro BOOLEAN default false;
        DECLARE credencial CHAR(8) default '';
        DECLARE userId INT;
        DECLARE counter int default 0;
        DECLARE caracteresPermitidos varchar(62) default 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        DECLARE tamanhoCredencial INT DEFAULT 8;
        DECLARE credencialExiste boolean DEFAULT TRUE;
        
		/*Validar dados*/
		SET erro = (userEmail is null OR userEmail like '') OR  (CHAR_LENGTH(userSenha) < 8);
		IF erro THEN
			SIGNAL SQLSTATE '45000' SET message_text = 'Erro com os dados';
			ROLLBACK;
		ELSE
			START TRANSACTION;

				/*Conferir o email e senha*/
				SET userId = (SELECT user_id FROM tb_usuarios WHERE user_email = userEmail AND user_senha = userSenha);
				IF (userId IS NOT NULL) THEN
	
					/*Gerando credencial*/
                    WHILE credencialExiste do
						WHILE counter < tamanhoCredencial do
							SET credencial = concat(credencial, substring(caracteresPermitidos, rand()*char_length(caracteresPermitidos), 1));
							SET counter = counter + 1;
						END WHILE;
                        IF ((SELECT COUNT(*) FROM tb_credenciais WHERE credencial_cod = credencial) = 0) THEN
							SET credencialExiste = FALSE;
                            ELSE
								SET credencial = '';
                        END IF;
                    END WHILE;
                    
                    /*Salvando credenciais no banco de dados*/
					INSERT INTO tb_credenciais(credencial_cod,user_id)
					VALUES (credencial, userId);

                    /*Enviando credencial ao usuario*/
					SELECT credencial AS 'credencial', user_email AS 'email', user_nome AS 'nome', user_sobrenome AS 'sobrenome' FROM tb_usuarios WHERE user_id = userId;
				ELSE
                SIGNAL SQLSTATE '45000' SET message_text = 'A conta não existe';
			END IF;
		COMMIT;
	END IF;
END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_login TO 'app'@'localhost';

/*----------------------------CanceleCredencial------------------------------------------*/
USE db_ceos;
DELIMITER $$
CREATE PROCEDURE pro_cancelar_credencial(credencial CHAR(8))
	BEGIN
	DECLARE quantidadeCredencial INT;
	SET quantidadeCredencial = (SELECT COUNT(*) FROM tb_credenciais WHERE credencial_cod = credencial);
	IF(quantidadeCredencial = 1) THEN
		START TRANSACTION;
			DELETE FROM tb_credenciais WHERE credencial_cod = credencial;
		COMMIT;
	ELSE
		SIGNAL SQLSTATE '45000' SET message_text = 'A credencial não existe';
	END IF;
	END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_cancelar_credencial TO 'app'@'localhost';

/*----------------------------ConfirmeCredencial------------------------------------------*/
USE db_ceos;
DELIMITER $$
CREATE PROCEDURE pro_confirme_credencial(credencial CHAR(8))
	BEGIN
    DECLARE quantidadeCredenciais INT;
		START TRANSACTION;
			SELECT user_email AS 'email', user_nome AS 'nome', user_sobrenome AS 'sobrenome' 
            FROM tb_usuarios 
            INNER JOIN tb_credenciais
            ON tb_usuarios.user_Id = tb_credenciais.user_Id
            WHERE tb_credenciais.credencial_cod = credencial;
		COMMIT;
	END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_confirme_credencial TO 'app'@'localhost';

/*----------------------------pegueArtigo------------------------------------------*/
USE db_ceos;
DELIMITER $$
CREATE PROCEDURE pro_pegue_artigo(urlArtigo VARCHAR(250))
	BEGIN
		SELECT A.art_url AS url, A.art_conteudo AS conteudo, A.art_titulo AS titulo, A.art_data_publicacao AS dataPublicacao, U.user_nome AS nomeAutor, U.user_sobrenome AS sobrenomeAutor
        FROM tb_artigos AS A
        INNER JOIN tb_usuarios AS U
        ON A.user_id = U.user_id
		WHERE A.art_url = urlArtigo;
	END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_pegue_artigo TO 'app'@'localhost';
/*----------------------------resumaArtigo------------------------------------------*/
USE db_ceos;
DELIMITER $$
CREATE PROCEDURE pro_resuma_artigo(urlArtigo VARCHAR(250))
	BEGIN
		SELECT A.art_url AS url, concat(LEFT(A.art_conteudo, 250),'...') AS conteudo, A.art_titulo AS titulo, A.art_data_publicacao  AS dataPublicacao, U.user_nome  AS nomeEscritor, U.user_sobrenome  AS sobrenomeEscritor
		FROM tb_artigos AS A, tb_usuarios AS U, tb_escritores AS E
		WHERE A.art_id = E.art_id AND U.user_id = E.user_id AND A.art_url = urlArtigo;
	END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_resuma_artigo TO 'app'@'localhost';

/*----------------------------resumaVariosArtigos------------------------------------------*/
USE db_ceos;
/*Aqui provavelmente existe um possivel erro na ordem dos artigos*/
DELIMITER $$
CREATE PROCEDURE pro_resuma_varios_artigos(quantidadeArtigo INT, urlArtigo VARCHAR(250))
	BEGIN
		DECLARE id_primeiro_artigo INT;
		IF urlArtigo IS NULL OR urlArtigo = ''
		THEN
			SET id_primeiro_artigo = 0;
		ELSE
			SET id_primeiro_artigo = (SELECT art_id FROM tb_artigos WHERE art_url = urlArtigo);
		END IF;
		SELECT A.art_url AS url, concat(LEFT(A.art_conteudo, 250),'...') AS conteudo, A.art_titulo AS titulo, A.art_data_publicacao  AS dataPublicacao, U.user_nome  AS nomeEscritor, U.user_sobrenome  AS sobrenomeEscritor
		FROM tb_artigos AS A, tb_usuarios AS U, tb_escritores AS E
		WHERE A.art_id = E.art_id AND U.user_id = E.user_id AND A.art_id > id_primeiro_artigo
        ORDER BY A.art_data_publicacao DESC
        LIMIT quantidadeArtigo;
	END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_resuma_varios_artigos TO 'app'@'localhost';
/*----------------------------crieArtigo------------------------------------------*/
USE db_ceos;
DELIMITER $$
CREATE PROCEDURE pro_crie_artigo(credencial CHAR(8),  urlArtigo VARCHAR(250))
	BEGIN
		DECLARE userId INT;
        DECLARE artId INT;
		START TRANSACTION;
			SET userId = (SELECT user_id FROM tb_credenciais  WHERE credencial_cod = credencial);
            INSERT INTO tb_artigos(art_url, user_id) VALUES(urlArtigo, userId);
		COMMIT;
	END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_crie_artigo TO 'app'@'localhost';

/*----------------------------deleteArtigo------------------------------------------*/
USE db_ceos;
DELIMITER $$
CREATE PROCEDURE pro_delete_artigo(credencial CHAR(8),  urlArtigo VARCHAR(250))
	BEGIN
		DECLARE userId INT;
        DECLARE artId INT;
        DECLARE escritor BOOLEAN;
		START TRANSACTION;
			SET userId = (SELECT user_id FROM tb_credenciais WHERE credencial_cod = credencial);
			SET artId = (SELECT art_id FROM tb_artigos WHERE art_url = urlArtigo);
			SET escritor = (SELECT COUNT(*) FROM tb_escritores WHERE user_id = userId AND art_id = artId);
            IF escritor = 1 
            THEN
				DELETE FROM tb_escritores WHERE art_id = artId AND user_id = userId;
                DELETE FROM tb_artigos WHERE art_url = urlArtigo;
			ELSE
				SELECT 'Voce não pode deletar algo que não é seu.' AS 'Msg';
            END IF;
		COMMIT;
	END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_delete_artigo TO 'app'@'localhost';
/*----------------------------editeArtigo------------------------------------------*/
USE db_ceos;
DELIMITER $$
CREATE PROCEDURE pro_edite_artigo(credencial CHAR(8),  urlArtigo VARCHAR(250), novaUrlArtigo VARCHAR(250), novoArtTitulo VARCHAR(200), novoArtConteudo TEXT)
	BEGIN
		DECLARE erro BOOLEAN default false;
		DECLARE userId INT;
        DECLARE artId INT;
        DECLARE escritor BOOLEAN;
		START TRANSACTION;
			SET erro = (credencial IS NULL OR credencial like '') OR  (urlArtigo IS NULL OR urlArtigo like '');
            IF erro THEN
				SIGNAL SQLSTATE '45000' SET message_text = 'Erro nos dados.';
				ROLLBACK;
			ELSE
				SET userId = (SELECT user_id FROM tb_credenciais WHERE credencial_cod = credencial);
				SET artId = (SELECT art_id FROM tb_artigos WHERE art_url = urlArtigo);/*calma*/
				SET escritor = (SELECT COUNT(*) FROM tb_artigos WHERE user_id = userId AND art_url = urlArtigo);
				IF escritor = 1 
					THEN
						IF (novoArtTitulo IS NOT NULL OR novoArtTitulo NOT LIKE '')
							THEN
								UPDATE tb_artigos
								SET art_titulo = novoArtTitulo
								WHERE art_url = urlArtigo;
							END IF;
                            
						IF (novoArtConteudo IS NOT NULL OR novoArtConteudo NOT LIKE '')
							THEN
								UPDATE tb_artigos
								SET art_conteudo = novoArtConteudo
								WHERE art_url = urlArtigo;
							END IF;
							
						IF (novaUrlArtigo IS NOT NULL OR novaUrlArtigo NOT LIKE '')/* vc parou aqui */
							THEN
								UPDATE tb_artigos
								SET art_url = novaUrlArtigo
								WHERE art_url = urlArtigo;
							END IF;
						SELECT art_url AS 'url', art_titulo AS 'titulo', art_conteudo as 'conteudo', art_data_publicacao AS 'dataPublicacao' FROM tb_artigos WHERE artId = art_id;
				ELSE
					SIGNAL SQLSTATE '45000' SET message_text = 'O artigo não pertence ao usuario em questão';
				END IF;
            END IF;
		COMMIT;
	END$$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE db_ceos.pro_edite_artigo TO 'app'@'localhost';

FLUSH PRIVILEGES;
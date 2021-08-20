# Api Ceos
A api Ceos é uma api que te ajuda a se conectar ao back-end do nosso projeto, com essa api voce consegue controlar a conta do usuario e acessar os artigos e resumos da plataforma, para entender como isso funciona na pratica leia o proximo topico.

>**⚠️WARNING**: Graças ao cross  não consegui configurar a api para criar os cookies em dominios de terceiros, por isso boa parte das funções da api não irão funcionar fora do dominio [Ceos Community](https://ceoscommunity.herokuapp.com), considere colaborar para fazer com que o projeto funcione melhor!

## Como usar?
No HTML dentro da tag head adicione o seguinte:
~~~HTML
<script src="https://ceoscommunity.herokuapp.com/files/javascript/apiCeos.js"></script>
~~~
Isso vai ser responsavel por importar o código que faz a comunicação com o back-end.

Ao importar esse script será possivel acessar a classe `ApiCeos`, para utiliza-la basta gerar uma instancia dessa classe em seu código javascript:
~~~javascript
const apiCeos = new ApiCeos();
~~~
Manipunlando esse objeto será possivel criar diversas funcionalidades.

### Acessando usuario
Imagine o usuario como o lugar onde voce irá encontrar todas as informações de login, alem de ter a possivbilidade de se registrar e verificar se o usuario tem ou não uma conta.

Para criar uma conta basta usar o seguinte script:
~~~javascript
    apiCeos.usuario.registro('Kawan','Araujo','emailgenerico@gmail.com','senha123')
    .then(()=>{
        console.log('Conta criada!');
    })
    .catch((err)=>{
        console.log('Houve algum erro!');
        console.log(err);
    });
~~~

Caso tenha alguma dificuldade em entender como funciona o then e catch recomendo que estude um pouco sobre [Promises](https://www.youtube.com/watch?v=nRJhc6vXyK4&t).

Se o login foi bem sucedido será possivel acessar os dados do usuario de duas formas, a primeira é através do then, a segunda é através do proprio objeto `apiCeos.usuario`:
~~~javascript
apiCeos.usuario.email;
apiCeos.usuario.nome;
apiCeos.usuario.sobrenome;
~~~
*Obs1: em breve sera desenvolvida a opção de foto de usuario, quando isso for possivel o link da imagem tambem estará disponivel através desse objeto.*

*Obs2: A atualização de dados tambem será desenvolvida*

Para fazer login basta usar o seguinte script:
~~~javascript
apiCeos.usuario.login('www.seliganessa.com@gmail.com', '12345678')
    .then((dados)=>{
        console.log('Seus dados chegaram');
        console.log(dados);
    })
    .catch(()=>{
    console.log('Seus dados não vão chegar se vc não tiver um email ou senha validos');
    });
~~~

Se as credenciais estiverem corretas a função dentro do then será executada, e voce podera ter acesso aos dados através do parametro `dados`. Esses dados tambem serão registrados no próprio objeto.

*Obs: Uma vez que o usuario fizer login este terá uma credencial que será armazenada internamente, sendo assim, mesmo que feche o navegador, quando o usuario voltar a entrar no site ele vai ser logado automaticamente, e os dados do usuario estarão disponiveis para acesso  sem a necessidade de refazer o login.*

*Para testar isso use o script de login, recarregue a pagina e confira se os dados ainda estão em* `apiCeos.usuario`.

Caso seja necessario é possivel verificar a credencial que esta logada no momento, assim puxando os dados do usuario do servidor. Para fazer isso basta:

~~~javascript
    apiCeos.usuario.confirmeCredencial()
        .then ((dadosUsuario)=>{
            console.log('Seus dados chegaram');
            console.log(dadosUsuario);
        })
        .catch((err)=>{
            console.log('Houve um erro ao tentar confirmar a credencial');
            console.log(err);
        });
~~~
É importante ressaltar que os dados do usuario já são puxados do servidor ao utilizar `new ApiCeos()` no inicio do script, portanto só use `apiCeos.usuario.confirmeCredencial()` caso seja necessario verificar se a credencial foi alterada ou se os dados do usuario precisam ser verificados. 

Caso seja necessario fazer logoff, encerrando a seção do usuario e excluindo os dados armazenados temporariamente em `apiCeos.usuario` basta utilizar:

~~~javascript
    apiCeos.usuario.logoff()
        .then (()=>{
            console.log('Logoff realizado com sucesso');
        })
        .catch((err)=>{
            console.log('Houve um erro ao tentar fazer logoff');
            console.log(err);
        });
~~~

### Acessando a biblioteca
Imagine a biblioteca como o lugar onde voce irá vizualizar os resumos e encontrar os artigos do usuario que esta logado.

Para pegar os resumos do servidor basta usar o seguinte:
~~~javascript
    apiCeos.biblioteca.pushResumos(5)
        .then(dados=>{
            console.log('Seus resumos vão chegar aqui');
            console.log(dados);
        })
        .catch(err=>{
            console.log('Aqui sera executado caso de erro');
            console.log(err);
        });
~~~ 
O script acima pega 5 resumos no servidor.

É possivel obter os resumos de duas formas diferentes, a primeira é acessar esse valor com uma função dentro do then(no caso do código acima) ou pegar o historico de resumos em:
~~~javascript
apiCeos.biblioteca.resumos;
~~~
Dentro desse atributo existe uma lista que contem todos os resumos com algumas informações relevantes, como conteudo, titulo, autor, link etc.

Para apagar todos os resumos locais basta usar:
~~~javascript
apiCeos.biblioteca.restart();
~~~
Alem disso, tambem é possivel buscar os artigos do usuario logado, para isso basta já ter feito login e usar o seguinte metodo:
~~~javascript
    apiCeos.biblioteca.pushMeusArtigos()
        .then((listaArtigos)=>{
            console.log('Esses são seus artigos:');
            console.log(listaArtigos);
        })
        .catch((err)=>{
            console.log('ocorreu um erro:');
            console.log(err);
        });
~~~
### Acessando a editora

Imagine a editora como o lugar onde é possivel criar e editar os seus artigos. Para acessar a editora basta utilizar:

~~~javascript 
    apiCeos.editora;
~~~ 

Para criar um artigo utilize o metodo `criarArtigo` e informe a nova url do artigo:

~~~javascript 
    apiCeos.editora.criarArtigo('minha-nova-url')
        .then(()=>{
            console.log('Artigo criado com sucesso');
        })
        .catch((err)=>{
            console.log('O artigo não pode ser criado');
            console.log(err);
        });
~~~ 

Com o artigo criado agora é possivel editar as informações contidas nele da seguinte forma:

~~~javascript 
    apiCeos.editora.editarArtigo('minha-nova-url', {
        titulo : 'Novo titulo', 
        conteudo: 'olá pessoas amaveis, sejam todos muito bem vindos!',
    })
        .then(()=>{
            console.log('Artigo editado com sucesso');
        })
        .catch((err)=>{
            console.log('ocorreu um erro ao tentar editar o artigo.');
            console.log(err);
        })
~~~ 

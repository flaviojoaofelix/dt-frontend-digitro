# Dígitro

## Desafio Técnico Front-end

Projeto proposto pela [Dígitro](https://www.digitro.com/) para o Desafio Técnico referente ao processo seletivo, onde foi solicitado a criação de uma aplicação de conversas de chat utilizando ReactJS e Socket.io.

## Tenologias Utilizadas

1. **ViteJS**[^1]

- Ferramenta para criação do ambiente de desenvolvimento.

2. **ReactJS**[^2]

- Biblioteca JavaScript para criação de interfaces de usuário.

3. **React Router Dom**[^3]

- Biblioteca JavaScript para trabalhar com rotas no React.

4. **Socket.io**[^4]

- Biblioteca JavaScript para trabalhar com WebSockets.

5. **ESLint**[^5]

- Ferramenta para padronização do código.

6. **Prettier**[^6]

- Ferramenta para formatação do código.

7. **Bootstrap**[^7]

- Biblioteca para estilização CSS do layout.

## Preview da Aplicação

- [Github Pages](https://flaviojoaofelix.dev/dt-frontend-digitro/)

## Rodando a Aplicação

### Requisitos

1. Para rodar locamente:

- **NodeJS**: v16+[^8]
- **NPM**: v8+[^9]

2. Para rodar com Docker

- **Docker**: v20+[^10]
- **Docker Compose**: v2+[^11]

### Passo a Passo

<details>
  <summary>Para Rodar Localmente</summary>

  1. Faça o clone do repositório:

  ```bash
  git clone git@github.com:flaviojoaofelix/dt-frontend-digitro.git
  ```

  2. Acesse o diretório do projeto

  ```bash
  cd dt-frontend-digitro
  ```

  2. Instale as dependências:

  ```bash
  npm install
  ```

  3. Inicie a aplicação:

- Em modo desenvolvedor:

  ```bash
  npm run dev
  ```

  E acesse a aplicação pelo URL: <http://127.0.0.1:5173/>

- Em modo produção:

  ```bash
  npm run build
  ```

  ```bash
  npm run preview
  ```

  E acesse a aplicação pelo URL: <http://127.0.0.1:4173/>

</details>

<details>
  <summary>Para Rodar com Docker</summary>

  1. Faça o clone do repositório:

  ```bash
  git clone git@github.com:flaviojoaofelix/dt-frontend-digitro.git
  ```

  2. Acesse o diretório do projeto

  ```bash
  cd dt-frontend-digitro
  ```

  2. Mude para o Branch *'docker'*:

  ```bash
  git checkout docker
  ```

  3. Inicie o container Docker:

```bash
  docker-compose up -d
  ou
  docker compose up -d
  ```

  4. Acesse a aplicação pelo URL: <http://127.0.0.1:5173/>

  5. Para parar o container Docker:

```bash
  docker-compose down
  ou
  docker compose down
```

</details>

## Requisitos do Desafio

<details>
  <summary>Funcionalidades da Aplicação</summary>

  1. Permitir informar um nome de usuário e a quantidade de chats simultâneos que serão atendidos.
  2. Exibir a lista de conversas em andamento com a identificação de cada uma delas,
  3. Exibir os dados da conversa ao clicar sobre uma conversa em andamento.

</details>

<details>
  <summary>Funcionalidades do Usuário</summary>

  1. Poderá conectar e desconectar o usuário.
    - No momento da conexão informará o nome de usuário e o número máximo de chats simultâneos que o servidor poderá enviar para o usuário.
    - Quando estiver desconectado não vai receber chats;
  2. Poderá alternar entre os chats em andamento;
  3. Poderá finalizar uma chamada;

</details>

<details>
  <summary>Informações Técnicas</summary>

  1. A interface se comunicará com o servidor via websocket (socket.io) que está hospedado em um domínio da Dígitro: <http://dev.digitro.com/callcontrol>
  2. Documentação da API disponível no arquivo API.md
  3. Uma vez o usuário conectado, o servidor começará a enviar eventos de nova chamada para ele até atingir o máximo simultâneo pré-definido na conexão do usuário.
    - O servidor enviará um evento USER_CONNECTED caso a conexão tenha sido feita com sucesso.
    - Estas chamadas serão enviadas em intervalos de tempo aleatórios entre 0 e 15 segundos. ⚠Portanto, se na conexão informar o máximo de 1 chamada, fique atento que poderá levar até 15 segundos para o evento com esta chamada ser enviado.⚠

</details>

<details>
  <summary>Entrega</summary>

  1. O candidato deverá disponibilizar o link do seu projeto no GitHub com a documentação de como configurar e colocar o projeto para rodar.
  
</details>

## Deploy

1. Digitar o seguinte comando para gerar a build:

```bash
npm run build
```

2. Se desejar ver o preview, digitar o seguinte comando:

```bash
npm run preview
```

## Passos utilizados no desenvolvimento para configuração do ambiente

<details>
  <summary>Comandos utilizados para iniciar a aplicação</summary>

1. npm create vite@latest

```text
Instalação do ViteJS com React JavaScript
```

2. npm install

```text
Instalação e configuração inicial das dependências do Vite
```

3. npm install eslint

```text
Instalação do ESLint utilizado afim de padronizar o código desenvolvido.
```

4. npm install prettier

```text
Instalação do Prettier para formatação do código.
```

5. npm install eslint-config-prettier

```text
Instalação da biblioteca que integra o ESLint com o Prettier.
```

6. npm install eslint-plugin-import

```text
Plugin que aponta ao ESLint como resolver as importações
```

7. npm install eslint-plugin-jsx-a11y

```text
Plugin que verifica problemas de acessibilidade do JSX com ESLint
```

8. npm install eslint-plugin-react

```text
Regras específicas de React para ESLint
```

9. npm install socket.io-client

```text
Biblioteca websocket para trabalhar com a API
```

10. npm install react-router-dom

```text
Biblioteca para trabalhar com rotas no React
```

11. npm install gh-pages --save-dev

```text
Ferramenta para publicar o projeto no GitHub Pages
```

</details>

<details>
  <summary>Comandos utilizados para configuração da aplicação</summary>

1. Criar o arquivo .eslintrc.js na raiz do projeto

```text
Configuração do ESLint
```

2. Criar o arquivo .eslintignore na raiz do projeto

```text
Configuração do ESLint para ignorar arquivos
```

3. Adicionar o comando "lint" ao package.json

```text
Configuração do ESLint para rodar o comando lint através do NPM
```

4. Criar o arquivo .prettierrc na raiz do projeto

```text
Configuração do Prettier
```

5. Criar o arquivo .prettierignore na raiz do projeto

```text
Configuração do Prettier para ignorar arquivos
```

</details>

## Referências

[^1]: [ViteJS](https://vitejs.dev/)

[^2]: [ReactJS](https://pt-br.reactjs.org/)

[^3]: [React Router Dom](https://reactrouter.com/)

[^4]: [Socket.io](https://socket.io/)

[^5]: [ESLint](https://eslint.org/)

[^6]: [Prettier](https://prettier.io/)

[^7]: [Bootstrap](https://getbootstrap.com/)

[^8]: [NodeJS](https://nodejs.org/)

[^9]: [NPM](https://www.npmjs.com/)

[^10]: [Docker](https://www.docker.com/)

[^11]: [Docker Compose](https://docs.docker.com/compose/)

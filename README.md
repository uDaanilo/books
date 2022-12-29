<h1 align="center">Book</h1>

Uma aplicação rest que simula uma livraria online

### ⭐ Tecnologias

- Docker
- Typescript
- Express
- Swagger
- TypeORM
- Jest
- Eslint
- SQLite

### 🧩 Pré-requisitos

- Node v18
- Docker opcional

### 📚 Documentação

- Após iniciar a aplicação é possivel acessar a documentação da aplicação através do link [http://localhost:3000/docs](http://localhost:3000/docs)

### ⚡ Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/uDaanilo/books.git
   ```
2. Instale os pacotes
   ```sh
   npm install
   # ou
   yarn
   ```
3. Renomeie o arquivo <kbd>[example.env](example.env)</kbd> para `.env` e preencha com suas informações
   ```sh
   mv .example.env .env
   ```
4. Inicie o projeto
   ```sh
   npm run dev
   # ou
   yarn dev
   ```
   também é possivel iniciar utilizando docker
   ```sh
   chmod +x ./entrypoint.sh
   docker compose up
   ```

### 🧪 Rodando os testes

- é possivel rodar os testes através dos seguintes comandos

  ```sh
  npm run test
  # ou
  yarn test
  ```

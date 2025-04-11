# **API Upload Green**

API Green Desafio Técnico é uma API RESTful desenvolvida com Node.js, Express e Sequelize que implementa funcionalidades essenciais para a gestão de boletos em um condomínio fictício. A aplicação permite a importação de arquivos .csv e .pdf, listagem e filtragem de boletos, além da geração de relatórios em PDF codificados em base64. Também inclui o gerenciamento de lotes, integrando diferentes formatos de dados e funcionalidades típicas de sistemas administrativos.

---

# **Arquitetura**

## 🚀 Tecnologias Utilizadas

- **Ambiente de Nuvem da plataforma Railway**
- **Banco de dados PostgreSQL 15.12**
- **Linguagens Node.js e Typescript**
- **Docker (opcional, para rodar o banco de dados)**
- **Protocolo REST sobre HTTPS**
- **Postman v11.36.3, para testes de API**

## 🚀 Frameworks

- **Nest 10.1.11, para back end**
- **Class-validator 0.14.1, para validação de dados**
- **Class-transformer 0.5.1**
- **Swagger 7.4.2, para documentação da API**
- **nestjs/jwt 11.0.0, para segurança**
- **Prisma ORM 6.4.1, para persistência de dados**
- **Jest 29.5.0, para testes unitários**

---

# **Estrutura do projeto**

O projeto está estruturado conforme representado abaixo:

```
collection
src
├── controllers
│   └── BoletoController.ts         # Controlador com os endpoints relacionados a boletos
│
├── database
│   ├── config
│   │   └── database.ts             # Configuração da conexão com o banco de dados (Sequelize)
│   ├── migrations
│   │   ├── 20250410220702-create-table-lote.js
│   │   └── 20250410221057-create-table-boleto.js
│   ├── models
│   │   ├── boleto.model.ts         # Model de Boleto
│   │   ├── lote.model.ts           # Model de Lote
│   │   └── index.ts                # Agregador dos models
│   └── seeders
│       └── seed-lotes.ts           # Seeder para popular lotes de exemplo
│
├── interfaces
│   └── IBoletoRepository.ts        # Interface contrato do repositório de boletos
│
├── repositories
│   └── BoletoRepository.ts         # Implementação do repositório de boletos
│
├── routes
│   └── index.ts                    # Arquivo que define as rotas da aplicação
│
├── services
│   ├── CSVService.ts               # Serviço para importar boletos via CSV
│   ├── PDFService.ts               # (Se usado) Serviço de manipulação de PDFs
│   └── RelatorioService.ts         # Serviço responsável pela geração de relatórios em PDF
│
├── uploads/                        # Pasta temporária para arquivos enviados
│
├── main.ts                         # Ponto de entrada da aplicação 
│
├── .env                            # Variáveis de ambiente
└── .gitignore                      # Arquivos/pastas ignorados pelo Git
            
```

## Controllers

Responsáveis por receber as requisições HTTP e interagir com os serviços para processar os dados :

- BoletoController.ts: Gerencia a importação de arquivos, listagem e geração de relatórios  de boletos;


## Database

Contém a configuração do banco de dados, modelos, migrations e seeders:

- config/: Arquivo de configuração de conexão com o banco (database.ts);
- migrations/: Scripts de criação das tabelas lotes e boletos;
- models/: Representação dos dados com Sequelize (ORM);
- seeders/: Dados iniciais inseridos na tabela de lotes;


## Pacote collection

- collection: Testes funcionais da aplicação, que podem ser acionados a partir do Postman.


---


# **Camadas da Aplicação**

Os casos de uso são organizados em camadas que, em conjunto com os Design Patters detalhados mais adiante, apoiam na utilização de boas práticas de desenvolvimento, tal como os princípios do SOLID. Esta aplicação está utilizando as seguintes camadas:

- **Domain:** Camada de negócios e persistência, responsável pela representação do domínio de negócio e persistência dos dados, nela se encontram os patterns DTO, Entity e Repository;

- **Service:** Camada de serviços da aplicação, responsável pela comunicação entre a camada “Controller” e a camada “Domain”. Nela encontra-se o pattern Service.

- **Controller:** Camada de controle da aplicação, responsável pelo recebimento das requisições e interação com as demais camadas da aplicação para produzir a resposta final.

A divisão em camadas e os patterns utilizados auxiliam na utilização dos princípios do SOLID:

- **Single Responsability:** Cada classe implementada realizando apenas uma missão, ou seja, com uma única responsabilidade;

- **Open-Closed Principle:** Objetos ou entidades devem ser abertos para extensão, porém fechados para modificação. Extendendo e não alterando o código para novos comportamentos.

- **Liskov Substitution Principle:** Cada classe derivada deve ser substituível por sua classe base, evitando criar dependências com especializações.

- **Interface Segregation Principle:** Cada classe não pode ser obrigada a implementar interfaces e/ou métodos que não irá utilizar, sendo melhor criar interfaces para fins específicos.

- **Dependency Inversion Principle:** É melhor depender de abstrações e não de implementações específicas, pois isso gera desacoplamento de código.

---

# **Filters e Interceptors**

A aplicação utiliza alguns patterns para realizar tratamentos padronizados e facilitar a manutenção do código, conforme abaixo:

- Filter para Exceptions: Este filter captura e trata de forma adequada e padronizada todas as exceptions lançadas durante a execução do código, tanto provenientes de regras de negócio quanto erros não tratados. O objetivo é garantir o log padronizado de todas as exceptions e também um retorno padrão para o usuário da aplicação.

- Interceptors de Requests e Responses: Captura o fluxo de execução, garantido tratamento padronizado do request/response e permitindo fazer log detalhado. Essa técnica é muito útil para troubleshooting, permitindo a coleta de informação para desvendar erros e bugs mais complexos. O log detalhado pode ser ligado e desligado de acordo com o nível (debug, info, etc.). Permite ainda criar mecanismos de segurança, tais como impedir SQL injection (porém, não foi implementado).

---

# **Design Patterns**

- **DTO:** O Data Transient Object é um pattern utilizado para transportar os dados dados entre as camadas da aplicação e, nesta aplicação, é usado também para comportar as annotations de validação de dados na entrada (input);
- **Presenter:** Pattern utilizado para transporte de dados na camada mais externa da aplicação que levará os dados até o requisitante. Ou seja, é o pattern para transporte de dados na resposta (output).

- **Service:** Representa um serviço interno desta aplicação e serve para fazer o isolamento entre camadas.

- **Controller:** Pattern utilizado nesta aplicação para receber as requisições (input) e interagir com as camadas internas da aplicação a fim de gerar o resultado e enviar uma resposta ao requisitante.

- **Repository:** Patters utilizado para fazer o trabalho de persistência de dados, interagindo com a camada de banco de dados.

---

# Instalação e Configuração

## **Pré-requisitos**

Antes de iniciar, certifique-se de ter instalado:

- [Node](https://nodejs.org/pt)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (Opcional)

## **Ambientes de Desenvolvimento**

### 📥 **Clonando o repositório**

```sh
git clone https://github.com/maxwelllbarboza/api-green-desafio-tecnico.git
```

### 📥 **Entrando no diretório**

```sh
cd api-green-desafio-tecnico
```

### 📥 **Rodar Docker Compose**

```sh
docker-compose up -d
```

### Executa o script para instalar o projeto

```bash
Set-ExecutionPolicy Unrestricted -Scope Process
.\setup.ps1
```

---

# **Documentação da API**

A documentação da API foi construída por meio do framework Swagger, muito utilizado pelo mercado para esta finalidade. Ele permite não só conhecer as especificações técnicas e funcionais da API, mas também executar testes online de forma interativa. Acesse a documentação completa por este [link.](https://api-ecommerce-desafio-tecnico-production.up.railway.app/docs)

---

# **Testes de API**

Para uma experiência interativa e fácil de testar os endpoints, você pode importar a Postman Collection. A collection contém todos os endpoints documentados, com exemplos de requisição e resposta. Basta importar a collection para sua instância do Postman e utilizar os exemplos de JSON para testar as requisições diretamente na ferramenta.

[Collection Postman](https://github.com/maxwelllbarboza/api-ecommerce-desafio-tecnico/tree/main/collection)

---

## 📝 **Licença**

Este projeto está sob a licença **MIT**.

---

👨‍💻 **Desenvolvido por [Maxwell R Barboza](https://github.com/maxwelllbarboza)**
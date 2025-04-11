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


---

# **Estrutura do projeto**

O projeto está estruturado conforme representado abaixo:

```
collection
src
├── controllers
│   └── BoletoController.ts         
│
├── database
│   ├── config
│   │   └── database.ts             
│   ├── migrations
│   │   ├── 20250410220702-create-table-lote.js
│   │   └── 20250410221057-create-table-boleto.js
│   ├── models
│   │   ├── boleto.model.ts         
│   │   ├── lote.model.ts           
│   │   └── index.ts                
│   └── seeders
│       └── seed-lotes.ts           
│
├── interfaces
│   └── IBoletoRepository.ts        
│
├── repositories
│   └── BoletoRepository.ts         
│
├── routes
│   └── index.ts                    
│
├── services
│   ├── CSVService.ts               
│   ├── PDFService.ts               
│   └── RelatorioService.ts         
│
├── uploads/                        
│
└── main.ts                                      
```

## Pacote collection

- collection: Testes funcionais da aplicação, que podem ser acionados a partir do Postman.


## Controllers

Responsáveis por receber as requisições HTTP e interagir com os serviços para processar os dados :

- BoletoController.ts: Gerencia a importação de arquivos, listagem e geração de relatórios  de boletos;


## Database

Contém a configuração do banco de dados, modelos, migrations e seeders:

- config/: Arquivo de configuração de conexão com o banco (database.ts);
- migrations/: Scripts de criação das tabelas lotes e boletos;
- models/: Representação dos dados com Sequelize (ORM);
- seeders/: Dados iniciais inseridos na tabela de lotes;

## Interfaces

Contém os contratos da aplicação, utilizados para aplicar o princípio de inversão de dependência :

- IBoletoRepository.ts: Interface com os métodos que devem ser implementados pelos repositórios de boletos;


## Repositories

Camada responsável pela persistência dos dados :

- BoletoRepository.ts: Implementa os métodos definidos na interface e realiza operações no banco de dados usando Sequelize;


## Routes

Define os endpoints e encaminha as requisições para os controladores :

- index.ts: Centraliza as rotas da aplicação;


## Services

Contém a lógica de negócio da aplicação e a geração de relatórios :

- CSVService.ts: Responsável pela importação e validação de arquivos .csv;
- PDFService.ts: Utilizado para extração e manipulação de dados a partir de arquivos PDF;
- RelatorioService.ts: Gera relatórios de boletos em PDF e retorna como base64.

## Uploads

Diretório para armazenar arquivos temporariamente após upload.



---



# 🏛**Camadas da Aplicação**

A arquitetura do projeto segue o modelo de camadas, permitindo organização e desacoplamento:

- **Controller:** Responsável por receber as requisições e chamar os serviços corretos (BoletoController.ts);

- **Service:** Onde fica a lógica de negócio (ex: leitura de arquivos, geração de relatórios, validações);

- **Repository:**  Lida com o acesso e manipulação de dados no banco;

- **Model:**  Representa o domínio da aplicação (boletos e lotes);


# 🧠**Princípios SOLID Aplicados**

- **Single Responsability:** Cada classe implementada realizando apenas uma missão, ou seja, com uma única responsabilidade;

- **Open-Closed Principle:** Objetos ou entidades devem ser abertos para extensão, porém fechados para modificação. Extendendo e não alterando o código para novos comportamentos.

- **Liskov Substitution Principle:** Cada classe derivada deve ser substituível por sua classe base, evitando criar dependências com especializações.

- **Interface Segregation Principle:** Cada classe não pode ser obrigada a implementar interfaces e/ou métodos que não irá utilizar, sendo melhor criar interfaces para fins específicos.

- **Dependency Inversion Principle:** É melhor depender de abstrações e não de implementações específicas, pois isso gera desacoplamento de código.


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


# **Testes de API**

Para uma experiência interativa e fácil de testar os endpoints, você pode importar a Postman Collection. A collection contém todos os endpoints documentados, com exemplos de requisição e resposta. Basta importar a collection para sua instância do Postman e utilizar os exemplos de JSON para testar as requisições diretamente na ferramenta.

[Collection Postman](https://github.com/maxwelllbarboza/api-green-desafio-tecnico/tree/main/collection)

---

## 📝 **Licença**

Este projeto está sob a licença **MIT**.

---

👨‍💻 **Desenvolvido por [Maxwell R Barboza](https://github.com/maxwelllbarboza)**
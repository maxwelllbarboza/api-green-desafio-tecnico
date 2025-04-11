# Instalar os pacotes
npm install

# Configurar variável de ambiente para o banco de dados
@"
DATABASE_URL="postgresql://pguser:pgpassword@localhost:5435/desafio_tecnico?schema=public"
"@ | Out-File -Encoding utf8 .env

# Aplicar criação do Banco desafio_tecnico
npx sequelize db:create

# Aplicar migrações no banco de dados
npx sequelize db:migrate

#Rodar o seed para gerar os Lotes
npm run seed

# Rodar o servidor NodeJS
npm run dev

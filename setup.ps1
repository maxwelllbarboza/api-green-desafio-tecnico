# Instalar os pacotes
npm install

# Configurar variável de ambiente para o banco de dados
@"
DATABASE_URL="postgresql://pguser:pgpassword@localhost:5435/desafio_tecnico?schema=public"
"@ | Out-File -Encoding utf8 .env

# Aplicar migrações no banco de dados
npx prisma migrate dev --name init

# Aplicar push do Prisma
npx prisma db push

# Aplicar generate do Prisma
npx prisma generate 

#Rodar o seed para gerar os Lotes
npm run seed

# Rodar o servidor NodeJS
npm run start:dev
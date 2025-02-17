# 1️⃣ Etapa de construção do React
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos necessários e instala as dependências
COPY package*.json ./
RUN npm install

# Copia todo o código do projeto e executa a build
COPY . .
RUN npm run build

# 2️⃣ Etapa de produção com Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta onde o Nginx vai rodar
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
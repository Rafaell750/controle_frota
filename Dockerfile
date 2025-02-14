# Usa a imagem oficial do Python
FROM python:3.10

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala o SQLite antes do pip
RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev

# Copia os arquivos do backend para dentro do container
COPY . /app

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta 5000 (onde o Flask roda)
EXPOSE 5000

# Comando para rodar o backend
CMD ["python", "app.py"]

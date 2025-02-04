from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS
import sqlite3
import bcrypt
import jwt as pyjwt

app = Flask(__name__)
CORS(app)

SECRET_KEY = "segredo_super_secreto"  # Chave para gerar o token JWT

def conectar_bd():
    return sqlite3.connect("frota.db", check_same_thread=False)

def criar_tabelas():
    conexao = conectar_bd()
    cursor = conexao.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS veiculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marca TEXT,
        modelo TEXT,
        placa TEXT UNIQUE,
        tipo TEXT,
        capacidade INTEGER,
        data_vencimento TEXT,
        data_manutencao TEXT
    )""")
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS motoristas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        cpf TEXT UNIQUE,
        habilitacao TEXT,
        validade_cnh TEXT
    )""")
    conexao.commit()
    conexao.close()

# Criar a tabela de usuários (execute apenas uma vez)
conn = sqlite3.connect("frota.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    )
""")

conn.commit()
conn.close()

criar_tabelas()

@app.route("/veiculos", methods=["POST"])
def cadastrar_veiculo():
    dados = request.json
    conexao = conectar_bd()
    cursor = conexao.cursor()
    try:
        cursor.execute("INSERT INTO veiculos (marca, modelo, placa, tipo, capacidade, data_vencimento, data_manutencao) VALUES (?, ?, ?, ?, ?, ?, ?)",
                       (dados["marca"], dados["modelo"], dados["placa"], dados["tipo"], dados["capacidade"], dados["data_vencimento"], dados["data_manutencao"]))
        conexao.commit()
        return jsonify({"mensagem": "Veículo cadastrado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"erro": "Placa já cadastrada!"}), 400
    finally:
        conexao.close()

@app.route("/motoristas", methods=["POST"])
def cadastrar_motorista():
    dados = request.json
    conexao = conectar_bd()
    cursor = conexao.cursor()
    try:
        cursor.execute("INSERT INTO motoristas (nome, cpf, habilitacao, validade_cnh) VALUES (?, ?, ?, ?)",
                       (dados["nome"], dados["cpf"], dados["habilitacao"], dados["validade_cnh"]))
        conexao.commit()
        return jsonify({"mensagem": "Motorista cadastrado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"erro": "CPF já cadastrado!"}), 400
    finally:
        conexao.close()

@app.route('/veiculos', methods=['GET'])
def get_veiculos():
    conn = sqlite3.connect('frota.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM veiculos")
    colunas = [desc[0] for desc in cursor.description]  # Captura os nomes das colunas
    veiculos = [dict(zip(colunas, row)) for row in cursor.fetchall()]  # Converte para dicionário
    conn.close()
    return jsonify(veiculos)  # Agora retorna uma lista de objetos 


@app.route("/motoristas", methods=["GET"])
def listar_motoristas():
    conexao = conectar_bd()
    cursor = conexao.cursor()
    cursor.execute("SELECT * FROM motoristas")
    motoristas = cursor.fetchall()
    conexao.close()
    return jsonify(motoristas)

@app.route('/veiculos/<int:id>', methods=['DELETE'])
def delete_veiculo(id):
    conn = sqlite3.connect('frota.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM veiculos WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Veículo removido com sucesso"}), 200

# Cadastro de Usuário
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    # Verifica se os dados foram enviados
    if not data:
        return jsonify({"message": "Nenhum dado enviado"}), 400

    email = data.get("email")
    senha = data.get("password")

    # Verifica se email e senha foram preenchidos
    if not email or not senha:
        return jsonify({"message": "Email e senha são obrigatórios"}), 400

    # Criptografa a senha
    senha_hash = bcrypt.hashpw(senha.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    # Insere o usuário no banco de dados
    conn = sqlite3.connect("frota.db")
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            ("Usuário Padrão", email, senha_hash)
)
        conn.commit()
        return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "Email já cadastrado"}), 400
    finally:
        conn.close()

# Login de Usuário
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    senha = data.get("senha")

    # Verifica se email e senha foram enviados
    if not email or not senha:
        return jsonify({"error": "Email e senha são obrigatórios"}), 400

    conn = sqlite3.connect("frota.db")
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, email, senha FROM usuarios WHERE email = ?", (email,))
        user = cursor.fetchone()
        conn.close()

        if user and bcrypt.checkpw(senha.encode('utf-8'), user[2].encode('utf-8')):
            token = pyjwt.encode(
                {"user_id": user[0], "exp": datetime.utcnow() + timedelta(hours=1)},
                SECRET_KEY,
                algorithm="HS256"
            )
            return jsonify({"token": token, "email": user[1]}), 200
        else:
            return jsonify({"error": "Credenciais inválidas"}), 401
    except Exception as e:
        return jsonify({"error": f"Erro no servidor: {str(e)}"}), 500
    

if __name__ == "__main__":
    app.run(debug=True)



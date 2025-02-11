from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS
import sqlite3
import bcrypt
import jwt as pyjwt

# Inicialização do aplicativo Flask
app = Flask(__name__)
CORS(app)

# Chave secreta para geração de tokens JWT
SECRET_KEY = "segredo_super_secreto"

def conectar_bd():
    # Conecta ao banco de dados SQLite.
    # Retorna a conexão com o banco de dados.
    return sqlite3.connect("frota.db", check_same_thread=False)

def criar_tabelas():
    # Cria as tabelas 'veiculos' e 'motoristas' no banco de dados, caso não existam.
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
        telefone TEXT,
        validade_toxicologico TEXT,
        validade_curso TEXT,
        validade_cnh TEXT
    )""")
    conexao.commit()
    conexao.close()

# Cria as tabelas ao iniciar o aplicativo
criar_tabelas()

#____________________________________________________________________________________________________________________

@app.route("/veiculos", methods=["POST"])
def cadastrar_veiculo():
    # Rota para cadastrar um novo veículo.
    # Recebe os dados do veículo via JSON e insere no banco de dados.
    # Retorna uma mensagem de sucesso ou erro.
    dados = request.json
    conexao = conectar_bd()
    cursor = conexao.cursor()
    try:
        cursor.execute("""
            INSERT INTO veiculos (marca, modelo, placa, tipo, capacidade, data_vencimento, data_manutencao)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            dados["marca"],
            dados["modelo"],
            dados["placa"],
            dados["tipo"],
            dados["capacidade"],
            dados["data_vencimento"],
            dados["data_manutencao"]
        ))
        conexao.commit()
        return jsonify({"mensagem": "Veículo cadastrado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"erro": "Placa já cadastrada!"}), 400
    finally:
        conexao.close()

@app.route("/motoristas", methods=["POST"])
def cadastrar_motorista():
    # Rota para cadastrar um novo motorista.
    # Recebe os dados do motorista via JSON e insere no banco de dados.
    # Retorna uma mensagem de sucesso ou erro.
    dados = request.json
    conexao = conectar_bd()
    cursor = conexao.cursor()
    try:
        cursor.execute("""
            INSERT INTO motoristas (nome, cpf, telefone, validade_toxicologico, validade_curso, validade_cnh)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            dados["nome"],
            dados["cpf"],
            dados["telefone"],
            dados["validade_toxicologico"],
            dados["validade_curso"],
            dados["validade_cnh"]
        ))
        conexao.commit()
        return jsonify({"mensagem": "Motorista cadastrado com sucesso!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"erro": "CPF já cadastrado!"}), 400
    finally:
        conexao.close()

#____________________________________________________________________________________________________________________

@app.route("/veiculos", methods=["GET"])
def get_veiculos():
    # Rota para listar todos os veículos cadastrados.
    # Retorna uma lista de veículos em formato JSON.
    conn = sqlite3.connect("frota.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM veiculos")
    colunas = [desc[0] for desc in cursor.description]  # Captura os nomes das colunas
    veiculos = [dict(zip(colunas, row)) for row in cursor.fetchall()]  # Converte para dicionário
    conn.close()
    return jsonify(veiculos)

@app.route("/motoristas", methods=["GET"])
def listar_motoristas():
    # Rota para listar todos os motoristas cadastrados.
    # Retorna uma lista de motoristas em formato JSON.
    conexao = conectar_bd()
    cursor = conexao.cursor()
    cursor.execute("SELECT id, nome, cpf, telefone, validade_toxicologico, validade_curso, validade_cnh FROM motoristas")
    colunas = [desc[0] for desc in cursor.description]  # Captura os nomes das colunas
    motoristas = [dict(zip(colunas, row)) for row in cursor.fetchall()]  # Converte para dicionário
    conexao.close()
    return jsonify(motoristas)

#____________________________________________________________________________________________________________________

@app.route("/veiculos/<int:id>", methods=["DELETE"])
def delete_veiculo(id):
    # Rota para deletar um veículo pelo ID.
    # Retorna uma mensagem de sucesso.
    conn = sqlite3.connect("frota.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM veiculos WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Veículo removido com sucesso"}), 200

@app.route("/motoristas/<int:id>", methods=["DELETE"])
def deletar_motorista(id):
    # Rota para deletar um motorista pelo ID.
    # Retorna uma mensagem de sucesso.
    conexao = conectar_bd()
    cursor = conexao.cursor()
    cursor.execute("DELETE FROM motoristas WHERE id = ?", (id,))
    conexao.commit()
    conexao.close()
    return jsonify({"mensagem": "Motorista removido com sucesso!"}), 200

#____________________________________________________________________________________________________________________

@app.route("/motoristas/<int:id>", methods=["PUT"])
def atualizar_motorista(id):
    # Rota para atualizar um motorista pelo ID
    dados = request.json
    conexao = conectar_bd()
    cursor = conexao.cursor()

    # Verifica se o CPF já existe para outro motorista
    cursor.execute("SELECT id FROM motoristas WHERE cpf = ? AND id != ?", (dados["cpf"], id))
    motorista_existente = cursor.fetchone()

    if motorista_existente:
        return jsonify({"erro": "CPF já cadastrado!"}), 400

    # Atualiza os dados do motorista
    cursor.execute("""
        UPDATE motoristas
        SET nome = ?, cpf = ?, telefone = ?, validade_toxicologico = ?, validade_curso = ?, validade_cnh = ?
        WHERE id = ?
    """, (
        dados["nome"],
        dados["cpf"],
        dados["telefone"],
        dados["validade_toxicologico"],
        dados["validade_curso"],
        dados["validade_cnh"],
        id
    ))
    conexao.commit()

    if cursor.rowcount == 0:
        return jsonify({"erro": "Motorista não encontrado!"}), 404

    conexao.close()
    return jsonify({"mensagem": "Motorista atualizado com sucesso!"}), 200




@app.route("/veiculos/<int:id>", methods=["PUT"])
def atualizar_veiculo(id):
    dados = request.json
    conexao = conectar_bd()
    cursor = conexao.cursor()

    try:
        # Verificar se a nova placa já existe para outro veículo
        cursor.execute("SELECT id FROM veiculos WHERE placa = ? AND id != ?", (dados["placa"], id))
        veiculo_existente = cursor.fetchone()

        if veiculo_existente:
            return jsonify({"erro": "Placa já cadastrada!"}), 400

        # Atualizar o veículo se a placa não estiver duplicada
        cursor.execute("""
            UPDATE veiculos
            SET marca = ?, modelo = ?, placa = ?, tipo = ?, capacidade = ?, data_vencimento = ?, data_manutencao = ?
            WHERE id = ?
        """, (
            dados["marca"],
            dados["modelo"],
            dados["placa"],
            dados["tipo"],
            dados["capacidade"],
            dados["data_vencimento"],
            dados["data_manutencao"],
            id
        ))

        conexao.commit()

        if cursor.rowcount == 0:
            return jsonify({"erro": "Veículo não encontrado!"}), 404

        return jsonify({"mensagem": "Veículo atualizado com sucesso!"}), 200

    except sqlite3.Error as e:
        return jsonify({"erro": str(e)}), 400

    finally:
        conexao.close()


# Inicia o servidor Flask
if __name__ == "__main__":
    app.run(debug=True)
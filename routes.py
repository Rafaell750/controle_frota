from flask import Blueprint, request, jsonify
from database import db
from models import Veiculo, Motorista
from utils import verificar_vencimento

bp = Blueprint("routes", __name__)

@bp.route("/veiculos", methods=["POST"])
def cadastrar_veiculo():
    data = request.json
    veiculo = Veiculo(**data)
    db.session.add(veiculo)
    db.session.commit()
    return jsonify({"message": "Veículo cadastrado!"}), 201

@bp.route("/veiculos", methods=["GET"])
def listar_veiculos():
    veiculos = Veiculo.query.all()
    return jsonify([
        {
            "marca": v.marca, "modelo": v.modelo, "placa": v.placa,
            "status_seguro": verificar_vencimento(v.data_vencimento),
            "status_manutencao": verificar_vencimento(v.data_manutencao)
        } for v in veiculos
    ])

@bp.route("/motoristas", methods=["POST"])
def cadastrar_motorista():
    data = request.json
    motorista = Motorista(**data)
    db.session.add(motorista)
    db.session.commit()
    return jsonify({"message": "Motorista cadastrado!"}), 201

@bp.route("/motoristas", methods=["GET"])
def listar_motoristas():
    motoristas = Motorista.query.all()
    return jsonify([
        {"nome": m.nome, "cpf": m.cpf, "status_cnh": verificar_vencimento(m.validade_cnh)}
        for m in motoristas
    ])

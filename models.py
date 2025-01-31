from database import db

class Veiculo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(50), nullable=False)
    modelo = db.Column(db.String(50), nullable=False)
    placa = db.Column(db.String(10), unique=True, nullable=False)
    tipo = db.Column(db.String(20), nullable=False)
    capacidade = db.Column(db.Integer, nullable=False)
    data_vencimento = db.Column(db.String(10), nullable=False)
    data_manutencao = db.Column(db.String(10), nullable=False)

class Motorista(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)
    habilitacao = db.Column(db.String(10), nullable=False)
    validade_cnh = db.Column(db.String(10), nullable=False)

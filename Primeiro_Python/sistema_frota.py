# sistema_frota.py
from veiculo import Veiculo
from motorista import Motorista


class SistemaFrota:
    def __init__(self):
        self.veiculos = []
        self.motoristas = []
        self.rotas = []
        self.viagens = []

    def cadastrar_veiculo(self, veiculo: Veiculo):
        self.veiculos.append(veiculo)

    def cadastrar_motorista(self, motorista: Motorista):
        self.motoristas.append(motorista)
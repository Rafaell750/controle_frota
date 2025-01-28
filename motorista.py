# motorista.py
class Motorista:
    def __init__(self, nome, cpf, habilitacao, validade_cnh):
        self.nome = nome
        self.cpf = cpf
        self.habilitacao = habilitacao
        self.validade_cnh = validade_cnh
        self.status = "Disponível"

    def __str__(self):
        return f"{self.nome} - Habilitação: {self.habilitacao}, Válida até: {self.validade_cnh}"

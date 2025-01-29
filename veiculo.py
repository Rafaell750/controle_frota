from datetime import datetime

class Veiculo:
    def __init__(self, marca, modelo, placa, tipo, capacidade, data_vencimento, data_manutencao):
        self.marca = marca
        self.modelo = modelo
        self.placa = placa
        self.tipo = tipo
        self.capacidade = capacidade
        self.data_vencimento = data_vencimento
        self.data_manutencao = data_manutencao


    def __str__(self):
        status_seguro = verificar_vencimento_pagamento(self.data_vencimento)
        return (f"{self.modelo} ({self.marca}) - Placa: {self.placa}, Tipo: {self.tipo}, "
                f"Capacidade: {self.capacidade} pessoas, Status seguro: {status_seguro}, Status manutecao: {status_manutecao}")

# Função para verificar se o pagamento está vencido ou prestes a vencer
def verificar_vencimento_pagamento(data_vencimento):
    """
    Verifica se o pagamento está vencido ou prestes a vencer.
    Se estiver vencido ou faltarem menos de 30 dias, retorna um status.
    """
    # Converte a string da data de vencimento para um objeto datetime
    data_vencimento = datetime.strptime(data_vencimento, "%Y-%m-%d")

    # Obtém a data atual
    data_atual = datetime.now()

    # Verifica se o pagamento já venceu ou se vai vencer dentro de 30 dias
    if data_vencimento < data_atual:
        return "Vencido"
    elif (data_vencimento - data_atual).days <= 30:
        return "Prestes a vencer"
    else:
        return "Em dia"

# Função para verificar se a manutenção está vencida ou prestes a vencer 
def verificar_vencimento_manutencao(data_manutencao):
    """
    Verifica se a última manutenção foi há muito tempo.
    Se passaram mais de 180 dias (6 meses), alerta que precisa ser feita.
    """
    data_manutencao = datetime.strptime(data_manutencao, "%Y-%m-%d")
    data_atual = datetime.now()

    # Verifica se já passou mais de 6 meses (180 dias)
    if (data_atual - data_manutencao).days > 180:
        return "Atrasada"
    elif (data_atual - data_manutencao).days > 150:
        return "Prestes a atrasar"
    else:
        return "Em dia"
    
# Função para exibir motoristas cadastrados
def listar_veiculos():
    """
    Exibe todos os motoristas cadastrados e o status da CNH (Vencida, Prestes a Vencer, Válida).
    """
    print("\n--- Veículos Cadastrados ---")
    
    # Verifica se há veículos cadastrados
    if sistema.veiculos:  # Verifica se a lista de veículos não está vazia
        for veiculo in sistema.veiculos:
            # Verifica o status da CNH
            data_vencimento = verificar_vencimento_pagamento(data_vencimento)
            
            # Exibe as informações do motorista com o status da CNH
            print(f"Marca: {veiculo.marca}, Modelo: {veiculo.modelo}, Placa: {veiculo.placa}, Tipo: {veiculo.tipo}, Capacidade: {veiculo.capacidade}, Status seguro: {data_vencimento}")
            
        else:
            print("Nenhum veículo cadastrado.")  # Exibe caso não haja veículos cadastrados
        
from datetime import datetime

# motorista.py
class Motorista:
    def __init__(self, nome, cpf, habilitacao, validade_cnh):
        self.nome = nome
        self.cpf = cpf
        self.habilitacao = habilitacao
        self.validade_cnh = validade_cnh
        

    def __str__(self):
        return f"{self.nome} - Habilitação: {self.habilitacao}, Válida até: {self.validade_cnh}"
    
# Função para verificar se a CNH está vencida ou prestes a vencer
def verificar_validade_cnh(validade_cnh):
    """
    Verifica se a CNH está vencida ou prestes a vencer.
    Se estiver vencida ou prestes a vencer (menos de 30 dias para a data atual),
    retorna um status.
    """
    # Converte a string da validade da CNH para um objeto datetime
    validade_cnh = datetime.strptime(validade_cnh, "%Y-%m-%d")

    # Obtém a data atual
    data_atual = datetime.now()

    # Verifica se a CNH já venceu ou se vai vencer dentro de 30 dias
    if validade_cnh < data_atual:
        return "Vencida"
    elif (validade_cnh - data_atual).days <= 30:
        return "Prestes a vencer"
    else:
        return "\033[0;32mVálida\033[0m"
    
# Função para exibir motoristas cadastrados
def listar_motoristas():
    """
    Exibe todos os motoristas cadastrados e o status da CNH (Vencida, Prestes a Vencer, Válida).
    """
    print("\n--- Motoristas Cadastrados ---")
    
    # Verifica se há motoristas cadastrados
    if sistema.motoristas:
        for motorista in sistema.motoristas:
            # Verifica o status da CNH
            status_cnh = verificar_validade_cnh(motorista.validade_cnh)
            
            # Exibe as informações do motorista com o status da CNH
            print(f"Nome: {motorista.nome}, CPF: {motorista.cpf}, Habilitação: {motorista.habilitacao}, "
                  f"Validade CNH: {motorista.validade_cnh}, Status CNH: {status_cnh}")
    else:
        print("Nenhum motorista cadastrado.")

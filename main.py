# Importa as classes necessárias do sistema
from sistema_frota import SistemaFrota
from veiculo import Veiculo
from motorista import Motorista

from datetime import datetime # data atual


# Cria uma instância do sistema de frota
sistema = SistemaFrota()

#_____________________________________________________________________________________
# Função para verificar se a CNH está vencida ou prestes a vencer
def verificar_validade_cnh(validade_cnh):
    """
    Verifica se a CNH está vencida ou prestes a vencer.
    Se estiver vencida ou prestes a vencer (menos de 30 dias para a data atual),
    retorna True para indicar que há um alerta.
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


#____________________________________________________________________________________________________________
# Função para exibir o menu principal
def exibir_menu():
    """
    Exibe o menu principal do sistema e solicita ao usuário que escolha uma opção.
    """
    print("\n--- Sistema de Controle de Frota ---")  # Título do menu
    print("1. Cadastrar Veículo")  # Opção para cadastrar um novo veículo
    print("2. Cadastrar Motorista")  # Opção para cadastrar um novo motorista
    print("3. Listar Veículos")  # lista para os veículos cadastrados
    print("4. Listar Motoristas") # lista para os motoristas cadastrados
    print("5. Sair")  # Opção para sair do sistema
    return input("Escolha uma opção: ")  # Solicita ao usuário uma escolha


# Loop principal para manter o sistema em execução
while True:
    # Exibe o menu e recebe a escolha do usuário
    opcao = exibir_menu()

    # Opção 1: Cadastrar Veículo
    if opcao == "1":
        # Solicita ao usuário os dados do veículo
        marca = input("Marca do veículo: ")  # Exemplo: "Toyota"
        modelo = input("Modelo do veículo: ")  # Exemplo: "Corolla"
        placa = input("Placa do veículo: ")  # Exemplo: "ABC-1234"
        tipo = input("Tipo do veículo (Ex: Carro, Ônibus, Caminhão): ")  # Exemplo: "Ônibus"
        capacidade = int(input("Capacidade do veículo (número de pessoas): "))  # Exemplo: "40"

        # Cria um novo objeto Veículo com todos os argumentos
        veiculo = Veiculo(marca, modelo, placa, tipo, capacidade)

        # Cadastra o veículo no sistema
        sistema.cadastrar_veiculo(veiculo)
        print(f"Veículo {modelo} cadastrado com sucesso!")  # Confirmação para o usuário


    # Opção 2: Cadastrar Motorista
    elif opcao == "2":
        # Solicita os dados do motorista
        nome = input("Nome completo do motorista: ")
        cpf = input("CPF: ")
        habilitacao = input("Tipo de habilitação: ")
        validade_cnh = input("Validade da CNH (AAAA-MM-DD): ")

        # Verifica se a CNH está vencida ou prestes a vencer
        status_cnh = verificar_validade_cnh(validade_cnh)

        # Alerta sobre a CNH se estiver vencida ou prestes a vencer
        if status_cnh == "Vencida":
            print("\033[91mALERTA: A CNH está vencida! Verifique a renovação.\033[0m")  # Alerta em vermelho
        elif status_cnh == "Prestes a vencer":
            print("\033[93mALERTA: A CNH está prestes a vencer! Verifique a renovação.\033[0m")  # Alerta em amarelo

        # Cria o objeto Motorista e cadastra
        motorista = Motorista(nome, cpf, habilitacao, validade_cnh)
        sistema.cadastrar_motorista(motorista)
        print(f"Motorista {nome} cadastrado com sucesso!")  # Confirmação para o usuário

    # Opção 3: Listar Veículos Cadastrados
    elif opcao == "3":
        print("\n--- Veículos Cadastrados ---")
        # Verifica se há veículos cadastrados
        if sistema.veiculos:  # Verifica se a lista de veículos não está vazia
            for veiculo in sistema.veiculos:
                print(f"Marca: {veiculo.marca}, Modelo: {veiculo.modelo}, Placa: {veiculo.placa}, Tipo: {veiculo.tipo}, Capacidade: {veiculo.capacidade}")
        else:
            print("Nenhum veículo cadastrado.")  # Exibe caso não haja veículos cadastrados

    # Opção 4: Listar Motoristas Cadastrados
    elif opcao == "4":
        print("\n--- Motoristas Cadastrados ---")
        # Verifica se há motoristas cadastrados
        
        if sistema.motoristas:  # Verifica se a lista de motoristas não está vazia
            for motorista in sistema.motoristas:
                # Verifica o status da CNH
                status_cnh = verificar_validade_cnh(motorista.validade_cnh)
                print(f"Nome: {motorista.nome}, CPF: {motorista.cpf}, Habilitação: {motorista.habilitacao}, Validade CNH: {motorista.validade_cnh}, Status CNH: {status_cnh}")
                
        else:
            print("Nenhum motorista cadastrado.")  # Exibe mensagem se não houver motoristas cadastrados

    # Opção 5: Sair
    elif opcao == "5":
        # Sai do loop principal e encerra o programa
        print("Saindo do sistema...")
        break

    # Opção inválida
    else:
        # Informa ao usuário que a opção não é válida
        print("Opção inválida. Tente novamente.")

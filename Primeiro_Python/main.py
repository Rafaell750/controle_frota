# Importa as classes necessárias do sistema
from sistema_frota import SistemaFrota
from veiculo import Veiculo, verificar_vencimento_pagamento, verificar_vencimento_manutencao, listar_veiculos
from motorista import Motorista, verificar_validade_cnh, listar_motoristas

from datetime import datetime # data atual


# Cria uma instância do sistema de frota
sistema = SistemaFrota()

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
        marca = input("Marca do veículo: ")
        modelo = input("Modelo do veículo: ")
        placa = input("Placa do veículo: ")
        tipo = input("Tipo do veículo (Ex: Carro, Ônibus, Caminhão): ")
        capacidade = int(input("Capacidade do veículo (número de pessoas): "))
        data_vencimento = input("Data do vencimento do seguro (AAAA-MM-DD): ")
        data_manutencao = input("Data da última manutenção (AAAA-MM-DD): ") 

        # Cria um novo objeto Veículo com todos os argumentos
        veiculo = Veiculo(marca, modelo, placa, tipo, capacidade, data_vencimento, data_manutencao)

        # Cadastra o veículo no sistema
        sistema.cadastrar_veiculo(veiculo)
        print(f"\nVeículo {modelo} cadastrado com sucesso!")

        # Verifica se o seguro está vencido ou prestes a vencer
        status_seguro = verificar_vencimento_pagamento(veiculo.data_vencimento)

        if status_seguro == "Vencido":
            print("\033[91mALERTA: O seguro está vencido! Verifique a renovação.\033[0m")
        elif status_seguro == "Prestes a vencer":
            print("\033[93mALERTA: O seguro está prestes a vencer! Verifique a renovação.\033[0m")

         # Verifica se a manutenção está vencida ou próxima
        status_manutencao = verificar_vencimento_manutencao(veiculo.data_manutencao)
        if status_manutencao == "Atrasada":
            print("\033[91mALERTA: A manutenção está atrasada! Agende uma revisão.\033[0m")
        elif status_manutencao == "Prestes a atrasar":
            print("\033[93mALERTA: A manutenção está prestes a atrasar! Planeje uma revisão.\033[0m")


    # Opção 2: Cadastrar Motorista
    elif opcao == "2":
        # Solicita os dados do motorista
        nome = input("Nome completo do motorista: ")
        cpf = input("CPF: ")
        habilitacao = input("Tipo de habilitação: ")
        validade_cnh = input("Validade da CNH (AAAA-MM-DD): ")

        # Cria o objeto Motorista e cadastra
        motorista = Motorista(nome, cpf, habilitacao, validade_cnh)
        sistema.cadastrar_motorista(motorista)
        print(f"\nMotorista {nome} cadastrado com sucesso!")  # Confirmação para o usuário

        # Verifica se a CNH está vencida ou prestes a vencer
        status_cnh = verificar_validade_cnh(validade_cnh)

        # Alerta sobre a CNH se estiver vencida ou prestes a vencer
        if status_cnh == "Vencida":
            print("\033[91mALERTA: A CNH está vencida! Verifique a renovação.\033[0m")  # Alerta em vermelho
        elif status_cnh == "Prestes a vencer":
            print("\033[93mALERTA: A CNH está prestes a vencer! Verifique a renovação.\033[0m")  # Alerta em amarelo

        

    # Opção 3: Listar Veículos Cadastrados
    elif opcao == "3":
        print("\n--- Veículos Cadastrados ---")
    
        if sistema.veiculos:  # Agora acessando corretamente os veículos cadastrados
            for veiculo in sistema.veiculos:
                status_seguro = verificar_vencimento_pagamento(veiculo.data_vencimento)
                status_manutencao = verificar_vencimento_manutencao(veiculo.data_manutencao)

                print(f"Marca: {veiculo.marca}, Modelo: {veiculo.modelo}, Placa: {veiculo.placa}, "
                  f"Tipo: {veiculo.tipo}, Capacidade: {veiculo.capacidade}, "
                  f"Status seguro: {status_seguro}, Status manutenção: {status_manutencao}")
        else:
            print("Nenhum veículo cadastrado.")  # Caso a lista esteja vazia


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

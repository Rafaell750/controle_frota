from datetime import datetime

def verificar_vencimento(data):
    data_formatada = datetime.strptime(data, "%Y-%m-%d")
    hoje = datetime.now()
    
    if data_formatada < hoje:
        return "Vencido"
    elif (data_formatada - hoje).days <= 30:
        return "Prestes a vencer"
    return "Em dia"

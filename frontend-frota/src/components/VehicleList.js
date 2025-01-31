import { useEffect, useState } from "react";
import { fetchVehicles, deleteVehicle } from "../services/api";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
  
    useEffect(() => {
      loadVehicles();
    }, []);
  
    const loadVehicles = async () => {
      const data = await fetchVehicles();
      setVehicles(data);
    };
  
    const handleDelete = async (id) => {
      await deleteVehicle(id);
      loadVehicles(); // Atualiza a lista após deletar
    };
  
    return (
      <div>
        <h2>Lista de Veículos</h2>
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id}>
                Marca: {vehicle.marca} - Modelo: {vehicle.modelo} - Placa: {vehicle.placa}  - Tipo: {vehicle.tipo} - Capacidade {vehicle.capacidade} - Ven.Seguro: {vehicle.data_vencimento} ({verificarStatus(vehicle.data_vencimento)}) - Ven.Manuteção:{vehicle.data_manutencao} ({verificarStatus(vehicle.data_manutencao)}) ---
                <button onClick={() => handleDelete(vehicle.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const verificarStatus = (data) => {
    const hoje = new Date();
    const dataVerificada = new Date(data);
    const diferenca = (dataVerificada - hoje) / (1000 * 60 * 60 * 24); // Diferença em dias
  
    if (diferenca < 0) return "🔴 Vencido"; // Se já passou
    if (diferenca <= 30) return "🟠 Prestes a vencer"; // Se faltar 30 dias ou menos
    return "🟢 Em dia"; // Se estiver tranquilo

  };

export default VehicleList;
  
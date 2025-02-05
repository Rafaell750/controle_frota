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
      {vehicles.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Ven. Seguro</th>
              <th>Ven. Manutenção</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.marca}</td>
                <td>{vehicle.modelo}</td>
                <td>{vehicle.placa}</td>
                <td>{vehicle.tipo}</td>
                <td>{vehicle.capacidade}</td>
                <td>
                  {vehicle.data_vencimento} <span>{verificarStatus(vehicle.data_vencimento)}</span>
                </td>
                <td>
                  {vehicle.data_manutencao} <span>{verificarStatus(vehicle.data_manutencao)}</span>
                </td>
                <td>
                  <button onClick={() => handleDelete(vehicle.id)}>❌ Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum veículo cadastrado.</p>
      )}
    </div>
  );
};

// Função para verificar status da data
const verificarStatus = (data) => {
  const hoje = new Date();
  const dataVerificada = new Date(data);
  const diferenca = (dataVerificada - hoje) / (1000 * 60 * 60 * 24); // Diferença em dias

  if (diferenca < 0) return "🔴 Vencido"; // Se já passou
  if (diferenca <= 30) return "🟠 Prestes a vencer"; // Se faltar 30 dias ou menos
  return "🟢 Em dia"; // Se estiver tranquilo
};

export default VehicleList;

  
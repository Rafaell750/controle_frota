// src/components/DriverList.js
import { useEffect, useState } from "react";
import { fetchDrivers, deleteDriver } from "../services/api";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    const data = await fetchDrivers();
    setDrivers(data);
  };

  const handleDelete = async (id) => {
    await deleteDriver(id);
    loadDrivers(); // Atualiza a lista após deletar
  };

  return (
    <div>
      <h2>Lista de Motoristas</h2>
      {drivers.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Validade Toxicológico</th>
              <th>Validade Cursos</th>
              <th>Validade CNH</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.nome}</td>
                <td>{driver.cpf}</td>
                <td>{driver.telefone}</td>

                <td>
                  {driver.validade_toxicologico}<span>{verificarStatus(driver.validade_toxicologico)}</span>
                </td>

                <td>
                  {driver.validade_curso}<span>{verificarStatus(driver.validade_curso)}</span>
                </td>

                <td>
                  {driver.validade_cnh}<span>{verificarStatus(driver.validade_cnh)}</span>
                </td>

                <td>
                  <button onClick={() => handleDelete(driver.id)}>❌ Remover</button>
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

const verificarStatus = (data) => {
  const hoje = new Date();
  const dataVerificada = new Date(data);
  const diferenca = (dataVerificada - hoje) / (1000 * 60 * 60 * 24); // Diferença em dias

  if (diferenca < 0) return "🔴 Vencido"; // Se já passou
  if (diferenca <= 30) return "🟠 Prestes a vencer"; // Se faltar 30 dias ou menos
  return "🟢 Em dia"; // Se estiver tranquilo
};

export default DriverList;

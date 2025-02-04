import { useEffect, useState } from "react";
import { fetchDrivers } from "../services/api";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  const loadDrivers = async () => {
    try {
      const data = await fetchDrivers();
      setDrivers(data);
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <div>
      <h2>Lista de Motoristas</h2>
      <ul>
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <li key={driver.id}>
              {driver.nome} - {driver.cpf} - {driver.habilitacao} - Validade CNH: {driver.validade_cnh}
            </li>
          ))
        ) : (
          <p>Nenhum motorista cadastrado.</p>
        )}
      </ul>
    </div>
  );
};

export default DriverList;

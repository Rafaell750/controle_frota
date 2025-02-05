import { useEffect, useState } from "react";
import { fetchDrivers } from "../services/api";

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const loadDrivers = async () => {
            try {
                const data = await fetchDrivers();
                setDrivers(data);
            } catch (error) {
                console.error("Erro ao carregar motoristas:", error);
            }
        };

        loadDrivers();
    }, []);

    return (
      <div>
        <h2>Lista de Motoristas</h2>
        {drivers.length > 0 ? (
          <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4" }}>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Nº Habilitação</th>
                <th>Validade CNH</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td>{driver.id}</td>
                  <td>{driver.nome}</td>
                  <td>{driver.cpf}</td>
                  <td>{driver.habilitacao}</td>
                  <td>{driver.validade_cnh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum motorista cadastrado.</p>
        )}
      </div>
    );
  };
  
  export default DriverList;

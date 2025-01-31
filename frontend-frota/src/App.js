import { useEffect, useState } from "react";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import { fetchVehicles } from "./services/api";

function App() {
  const [vehicles, setVehicles] = useState([]);

  const loadVehicles = async () => {
    const data = await fetchVehicles();
    setVehicles(data);
  };

  useEffect(() => {
    loadVehicles(); // Carrega os veículos ao iniciar
  }, []);

  return (
    <div>
      <h1>Gerenciamento de Frota</h1>
      <VehicleForm reloadVehicles={loadVehicles} /> {/* Passamos a função para recarregar */}
      <VehicleList vehicles={vehicles} />
    </div>
  );
}

export default App;



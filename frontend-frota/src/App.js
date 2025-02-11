import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import "./styles.css";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import DriverForm from "./components/DriverForm";
import DriverList from "./components/DriverList";
import { fetchVehicles, fetchDrivers } from "./services/api";
import Sidebar from "./components/Sidebar";
import Veiculos from "./pages/Veiculos";
import Motoristas from "./pages/Motoristas";
import Painel from "./pages/Painel";


function App() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Função para carregar veículos
  const loadVehicles = async () => {
    const data = await fetchVehicles();
    setVehicles(data);
  };

  // Função para carregar motoristas
  const loadDrivers = async () => {
    const data = await fetchDrivers();
    setDrivers(data);
  };

  useEffect(() => {
    loadVehicles(); // Carrega os veículos ao iniciar
    loadDrivers(); // Carrega os motoristas ao iniciar
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Painel />} />
            <Route path="/motoristas" element={<Motoristas />} />
            <Route path="/veiculos" element={<Veiculos />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

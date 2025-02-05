import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import DriverForm from "./components/DriverForm";
import DriverList from "./components/DriverList";
import { fetchVehicles, fetchDrivers } from "./services/api";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Rota privada para proteger a página de frota
const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/frota"
          element={
            <PrivateRoute>
              <div>
                <h1>Gerenciamento de Frota</h1>
                <VehicleForm reloadVehicles={loadVehicles} />
                <VehicleList vehicles={vehicles} />
                <DriverForm reloadDrivers={loadDrivers} />
                <DriverList drivers={drivers} />
              </div>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
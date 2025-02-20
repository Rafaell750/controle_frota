import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { io } from "socket.io-client";
import "./styles.css";

import { fetchVehicles, fetchDrivers } from "./services/api";
import Sidebar from "./components/Sidebar";
import Veiculos from "./pages/Veiculos";
import Motoristas from "./pages/Motoristas";
import Painel from "./pages/Painel";


function App() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

   // Configura o WebSocket
   useEffect(() => {
    const socket = io("http://127.0.0.1:5000"); // Substitua pelo IP do servidor

    // Solicita permissão para exibir notificações
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    // Recebe notificações do backend
    socket.on("notificacao", (data) => {
      if (Notification.permission === "granted") {
        new Notification(data.titulo, { body: data.mensagem });
      } else {
        console.log("Notificação recebida:", data.titulo, data.mensagem);
      }
    });

    // Limpa o socket ao desmontar o componente
    return () => socket.disconnect();
  }, []);

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

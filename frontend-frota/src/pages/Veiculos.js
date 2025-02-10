// src/pages/Veiculos.js
import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import "../styles.css";

const Veiculos = () => {
    return (
        <div className="page-container">
            <h2>Cadastro e Lista de Veículos</h2>
            <VehicleForm />
            <VehicleList />
        </div>
    );
};

export default Veiculos;

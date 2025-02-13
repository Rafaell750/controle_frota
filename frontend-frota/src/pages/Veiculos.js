// src/pages/Veiculos.js
import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import "../styles.css";

const Veiculos = () => {
    return (
        <div className="page-container">
            <h2 className="page-title">Painel Veículos</h2>
            <div className="content-wrapper">
                <VehicleForm />
                <VehicleList />
            </div>
        </div>
    );
};

export default Veiculos;
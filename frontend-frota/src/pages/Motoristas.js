// src/pages/Motoristas.js
import DriverForm from "../components/DriverForm";
import DriverList from "../components/DriverList";
import "../styles.css";

const Motoristas = () => {
    return (
        <div className="page-container">
            <h2>Cadastro e Lista de Motoristas</h2>
            <DriverForm />
            <DriverList />
        </div>
    );
};

export default Motoristas;

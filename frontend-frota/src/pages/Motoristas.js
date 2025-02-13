// src/pages/Motoristas.js
import DriverForm from "../components/DriverForm";
import DriverList from "../components/DriverList";
import "../styles.css";

const Motoristas = () => {
    return (
        <div className="page-container">
            <h2 className="page-title">Painel Motoristas</h2>
            <div className="content-wrapper">
                <DriverForm />
                <DriverList />
            </div>
        </div>
    );
};

export default Motoristas;
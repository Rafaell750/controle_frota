// src/components/Sidebar.js
import { Link } from "react-router-dom";
import "../styles.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Controle de Frota</h2>
            <nav>
                <ul>
                    <li><Link to="/painel">🏠 Painel</Link></li>
                    <li><Link to="/veiculos">🚗 Veículos</Link></li>
                    <li><Link to="/motoristas">🧑‍✈️ Motoristas</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

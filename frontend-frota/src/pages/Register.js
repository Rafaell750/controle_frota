import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // "Usuário cadastrado com sucesso!"
                navigate("/login");
            } else {
                alert(data.message || "Erro no cadastro");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao conectar ao servidor");
        }
    };

    return (
        <div>
            <h2>Cadastro</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            <button onClick={() => navigate("/login")}>Já tem uma conta? Login</button>
        </div>
    );
}

export default Register;
import { useState } from "react";
import { addDriver } from "../services/api";

const DriverForm = ({ reloadDrivers }) => {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    habilitacao: "",
    validade_cnh: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addDriver(form);
      alert(response.mensagem || "Motorista cadastrado com sucesso!");
      setForm({ nome: "", cpf: "", habilitacao: "", validade_cnh: "" });
      reloadDrivers();
    } catch (error) {
      console.error("Erro ao cadastrar motorista:", error);
      alert("Erro ao cadastrar motorista");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Motorista</h2>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cpf"
        placeholder="CPF"
        value={form.cpf}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="habilitacao"
        placeholder="Número da Habilitação"
        value={form.habilitacao}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="validade_cnh"
        placeholder="Validade da CNH"
        value={form.validade_cnh}
        onChange={handleChange}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default DriverForm;

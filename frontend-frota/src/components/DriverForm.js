import { useState } from "react";
import { addDriver } from "../services/api";

const DriverForm = ({ onDriverAdded }) => {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    validade_toxicologico: "",
    validade_curso: "",
    validade_cnh: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addDriver(form);
        alert("Motorista cadastrado com sucesso!");
        setForm({
          nome: "",
          cpf: "",
          telefone: "",
          validade_toxicologico: "",
          validade_curso: "",
          validade_cnh: "",
        });
        if (onDriverAdded) {
          onDriverAdded(); // Notifica que um veículo foi adicionado
        }
      } catch (error) {
        alert("Erro ao cadastrar motorista. Tente novamente mais tarde.");
        console.error(error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Cadastrar Motorista</h2>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
        <input name="validade_toxicologico" type="date" value={form.validade_toxicologico} onChange={handleChange} required />
        <input name="validade_curso" type="date" value={form.validade_curso} onChange={handleChange} required />
        <input name="validade_cnh" type="date" value={form.validade_cnh} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
    );
  };

export default DriverForm;

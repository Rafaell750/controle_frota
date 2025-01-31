import { useState } from "react";
import { addVehicle } from "../services/api";

const VehicleForm = ({ onVehicleAdded }) => {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    placa: "",
    tipo: "",
    capacidade: "",
    data_vencimento: "",
    data_manutencao: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVehicle(form);
      alert("Veículo cadastrado com sucesso!");
      setForm({
        marca: "",
        modelo: "",
        placa: "",
        tipo: "",
        capacidade: "",
        data_vencimento: "",
        data_manutencao: "",
      });
      if (onVehicleAdded) {
        onVehicleAdded(); // Notifica que um veículo foi adicionado
      }
    } catch (error) {
      alert("Erro ao cadastrar veículo. Tente novamente mais tarde.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Veículo</h2>
      <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} required />
      <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} required />
      <input name="placa" placeholder="Placa" value={form.placa} onChange={handleChange} required />
      <input name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} required />
      <input name="capacidade" type="number" placeholder="Capacidade" value={form.capacidade} onChange={handleChange} required />
      <input name="data_vencimento" type="date" value={form.data_vencimento} onChange={handleChange} required />
      <input name="data_manutencao" type="date" value={form.data_manutencao} onChange={handleChange} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default VehicleForm;

import { useState } from "react";
import { addVehicle } from "../services/api";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const VehicleForm = ({ open, onClose, onVehicleAdded }) => {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    ano_do_veiculo: "",
    placa: "",
    tipo: "",
    capacidade: "",
    data_vencimento: "",
    data_manutencao: "",
    data_tacografo: "",
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
        ano_do_veiculo: "",
        placa: "",
        tipo: "",
        capacidade: "",
        data_vencimento: "",
        data_manutencao: "",
        data_tacografo: "",
      });
      onClose(); // Fecha o modal após cadastrar
      if (onVehicleAdded) {
        onVehicleAdded(); // Notifica que um veículo foi adicionado
      }
    } catch (error) {
      alert("Erro ao cadastrar veículo. Tente novamente mais tarde.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Veículo</DialogTitle>
      <DialogContent>
        <TextField name="marca" label="Marca" value={form.marca} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="modelo" label="Modelo" value={form.modelo} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="ano_do_veiculo" label="Ano do Veículo" value={form.ano_do_veiculo} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="placa" label="Placa" value={form.placa} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="tipo" label="Tipo" value={form.tipo} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="capacidade" label="Capacidade" type="number" value={form.capacidade} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="data_vencimento" label="Vencimento do Seguro" type="date" value={form.data_vencimento} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField name="data_manutencao" label="Vencimento da Vistoria" type="date" value={form.data_manutencao} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField name="data_tacografo" label="Validade Tacógrafo" type="date" value={form.data_tacografo} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleForm;
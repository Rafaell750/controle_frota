import { useState } from "react";
import { addDriver } from "../services/api";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const DriverForm = ({ open, onClose, onDriverAdded }) => {
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
      onClose(); // Fecha o modal após cadastrar
      if (onDriverAdded) {
        onDriverAdded(); // Notifica que um motorista foi adicionado
      }
    } catch (error) {
      alert("Erro ao cadastrar motorista. Tente novamente mais tarde.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Motorista</DialogTitle>
      <DialogContent>
        <TextField name="nome" label="Nome" value={form.nome} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="cpf" label="CPF" value={form.cpf} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="telefone" label="Telefone" value={form.telefone} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="validade_toxicologico" label="Validade Exame Toxicológico" type="date" value={form.validade_toxicologico} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField name="validade_curso" label="Validade Curso" type="date" value={form.validade_curso} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField name="validade_cnh" label="Validade CNH" type="date" value={form.validade_cnh} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
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

export default DriverForm;
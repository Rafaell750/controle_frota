import { useState } from "react";
import { addDriver } from "../services/api";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

// Componente responsável pelo formulário de cadastro de motoristas
const DriverForm = ({ open, onClose, onDriverAdded }) => {
  // Estado local para armazenar os dados do formulário
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    validade_toxicologico: "",
    validade_curso: "",
    validade_cnh: "",
  });

  // Função para atualizar o estado conforme o usuário digita nos campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função que trata o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página ao enviar o formulário
    try {
      await addDriver(form); // Chama a API para adicionar um novo motorista
      alert("Motorista cadastrado com sucesso!");

      // Reseta os campos do formulário após o cadastro bem-sucedido
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
        onDriverAdded(); // Notifica que um novo motorista foi adicionado para atualizar a lista
      }
    } catch (error) {
      alert("Erro ao cadastrar motorista. Tente novamente mais tarde.");
      console.error(error); // Exibe o erro no console para depuração
    }
  };

  return (
    // Diálogo (modal) que contém o formulário de cadastro do motorista
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Motorista</DialogTitle>
      <DialogContent>
        {/* Campos do formulário */}
        <TextField name="nome" label="Nome" value={form.nome} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="cpf" label="CPF" value={form.cpf} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="telefone" label="Telefone" value={form.telefone} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="validade_toxicologico" label="Validade Exame Toxicológico" type="date" value={form.validade_toxicologico} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField name="validade_curso" label="Validade Curso" type="date" value={form.validade_curso} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField name="validade_cnh" label="Validade CNH" type="date" value={form.validade_cnh} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
      </DialogContent>
      <DialogActions>
        {/* Botão para cancelar e fechar o modal */}
        <Button onClick={onClose}>Cancelar</Button>
        {/* Botão para enviar o formulário e cadastrar o motorista */}
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DriverForm; // Exporta o componente para ser utilizado em outras partes do projeto

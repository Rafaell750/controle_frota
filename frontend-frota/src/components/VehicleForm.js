import { useState } from "react";
import { addVehicle } from "../services/api";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

// Componente VehicleForm: Formulário para cadastro de veículos
const VehicleForm = ({ open, onClose, onVehicleAdded }) => {
  // Estado para armazenar os dados do formulário
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

  // Função para atualizar os valores do formulário conforme o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função para tratar o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    try {
      await addVehicle(form); // Chama a função de API para adicionar o veículo
      alert("Veículo cadastrado com sucesso!"); // Exibe uma mensagem de sucesso

      // Reseta o formulário após o cadastro
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

      onClose(); // Fecha o modal após o cadastro

      // Se a função onVehicleAdded foi passada como prop, chama ela para notificar a adição de um veículo
      if (onVehicleAdded) {
        onVehicleAdded();
      }
    } catch (error) {
      alert("Erro ao cadastrar veículo. Tente novamente mais tarde."); // Mensagem de erro
      console.error(error); // Exibe o erro no console para depuração
    }
  };

  return (
    // Modal de diálogo para cadastro de veículo
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Veículo</DialogTitle>
      <DialogContent>
        {/* Campos de entrada do formulário */}
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
        {/* Botões de ação */}
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleForm; // Exporta o componente para ser utilizado em outros lugares

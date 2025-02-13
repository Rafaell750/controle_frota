import { useEffect, useState } from "react";
import { fetchVehicles, deleteVehicle, updateVehicle } from "../services/api";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import VehicleForm from "./VehicleForm"; // Importe o VehicleForm

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openVehicleForm, setOpenVehicleForm] = useState(false); // Estado para controlar o modal de cadastro
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [currentVehicle, setCurrentVehicle] = useState({
    id: "",
    marca: "",
    modelo: "",
    placa: "",
    tipo: "",
    capacidade: "",
    data_vencimento: "",
    data_manutencao: "",
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await fetchVehicles();
    setVehicles(data);
  };

  const handleDeleteClick = (id) => {
    setSelectedVehicleId(id);
    setOpenConfirmDialog(true); // Abre o modal de confirmação
  };

  const handleConfirmDelete = async () => {
    if (selectedVehicleId) {
      await deleteVehicle(selectedVehicleId);
      setOpenConfirmDialog(false); // Fecha o modal
      loadVehicles(); // Atualiza a lista
    }
  };

  const handleEditClick = (vehicle) => {
    setCurrentVehicle(vehicle);
    setOpenEditModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await updateVehicle(currentVehicle.id, currentVehicle);
      alert("Veículo atualizado com sucesso!");
      setOpenEditModal(false); // Fecha o modal
      loadVehicles(); // Atualiza a lista
    } catch (error) {
      alert(error.message); // Mostra o erro real para o usuário
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  const handleChange = (e) => {
    setCurrentVehicle({ ...currentVehicle, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Cadastro e Lista de Veículos</h2>

      {/* Botão para abrir o formulário de cadastro */}
      <Button variant="contained" color="primary" onClick={() => setOpenVehicleForm(true)}>
        Cadastrar Veículo
      </Button>

      {/* Modal de Cadastro de Veículo */}
      <VehicleForm
        open={openVehicleForm}
        onClose={() => setOpenVehicleForm(false)}
        onVehicleAdded={loadVehicles}
      />

      {vehicles.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>#</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Ven. Seguro</th>
              <th>Ven. Manutenção</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <td>{index + 1}</td>
                <td>{vehicle.marca}</td>
                <td>{vehicle.modelo}</td>
                <td>{vehicle.placa}</td>
                <td>{vehicle.tipo}</td>
                <td>{vehicle.capacidade}</td>
                <td>
                  <div style={{ whiteSpace: "nowrap" }}>{vehicle.data_vencimento}</div>
                  <div>{verificarStatus(vehicle.data_vencimento)}</div>
                </td>
                <td>
                  <div style={{ whiteSpace: "nowrap" }}>{vehicle.data_manutencao}</div>
                  <div>{verificarStatus(vehicle.data_manutencao)}</div>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <div style={{ marginBottom: "5px" }}>
                    <button onClick={() => handleEditClick(vehicle)}>✏️ Editar</button>
                  </div>
                  <div>
                    <button onClick={() => handleDeleteClick(vehicle.id)}>❌ Remover</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum veículo cadastrado.</p>
      )}

      {/* Modal de Edição */}
      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <DialogTitle>Editar Veículo</DialogTitle>
        <DialogContent>
          <TextField
            name="marca"
            label="Marca"
            value={currentVehicle.marca}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="modelo"
            label="Modelo"
            value={currentVehicle.modelo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="placa"
            label="Placa"
            value={currentVehicle.placa}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="tipo"
            label="Tipo"
            value={currentVehicle.tipo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="capacidade"
            label="Capacidade"
            type="number"
            value={currentVehicle.capacidade}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="data_vencimento"
            label="Vencimento do Seguro"
            type="date"
            value={currentVehicle.data_vencimento}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="data_manutencao"
            label="Data de Manutenção"
            type="date"
            value={currentVehicle.data_manutencao}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Confirmação de Remoção */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirmar Remoção</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja remover este veículo? Essa ação não pode ser desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const verificarStatus = (data) => {
  const hoje = new Date();
  const dataVerificada = new Date(data);
  const diferenca = (dataVerificada - hoje) / (1000 * 60 * 60 * 24); // Diferença em dias

  if (diferenca < 0) return "🔴 Vencido";
  if (diferenca <= 30) return "🟠 Prestes a vencer";
  return "🟢 Em dia";
};

export default VehicleList;
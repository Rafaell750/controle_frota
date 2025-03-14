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
import VehicleForm from "./VehicleForm"; // Importa o componente de formulário de veículo

// Componente VehicleList: Lista de veículos com funcionalidades de cadastro, edição e remoção
const VehicleList = () => {
  // Estado para armazenar a lista de veículos
  const [vehicles, setVehicles] = useState([]);
  // Estado para controlar a abertura do modal de edição
  const [openEditModal, setOpenEditModal] = useState(false);
  // Estado para controlar a abertura do modal de confirmação de remoção
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  // Estado para controlar a abertura do modal de cadastro de veículo
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  // Estado para armazenar o ID do veículo selecionado para remoção
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  // Estado para armazenar os dados do veículo em edição
  const [currentVehicle, setCurrentVehicle] = useState({
    id: "",
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

  // Carrega a lista de veículos ao montar o componente
  useEffect(() => {
    loadVehicles();
  }, []);

  // Função para buscar os veículos da API e atualizar o estado
  const loadVehicles = async () => {
    const data = await fetchVehicles();
    setVehicles(data);
  };

  // Função para exibir o modal de confirmação de remoção
  const handleDeleteClick = (id) => {
    setSelectedVehicleId(id);
    setOpenConfirmDialog(true);
  };

  // Função para confirmar e remover um veículo
  const handleConfirmDelete = async () => {
    if (selectedVehicleId) {
      await deleteVehicle(selectedVehicleId);
      setOpenConfirmDialog(false); // Fecha o modal
      loadVehicles(); // Atualiza a lista de veículos
    }
  };

  // Função para abrir o modal de edição com os dados do veículo selecionado
  const handleEditClick = (vehicle) => {
    setCurrentVehicle(vehicle);
    setOpenEditModal(true);
  };

  // Função para salvar as alterações do veículo editado
  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await updateVehicle(currentVehicle.id, currentVehicle);
      alert("Veículo atualizado com sucesso!");
      setOpenEditModal(false); // Fecha o modal de edição
      loadVehicles(); // Atualiza a lista de veículos
    } catch (error) {
      alert(error.message); // Exibe o erro ao usuário
    }
  };

  // Função para fechar o modal de edição
  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  // Função para atualizar os valores do formulário de edição conforme o usuário digita
  const handleChange = (e) => {
    setCurrentVehicle({ ...currentVehicle, [e.target.name]: e.target.value });
  };

  // Função para formatar datas no formato dd/mm/aaaa
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Evita erros caso o valor seja nulo
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h2>Cadastro e Lista de Veículos</h2>

      {/* Botão para abrir o formulário de cadastro de veículos */}
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
              <th>Ano Veículo</th>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Ven. Seguro</th>
              <th>Ven. Vistoria</th>
              <th>Ven. Tacógrafo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <td>{index + 1}</td>
                <td>{vehicle.marca}</td>
                <td>{vehicle.modelo}</td>
                <td style={{ textAlign: "center" }}>{vehicle.ano_do_veiculo}</td>
                <td>{vehicle.placa}</td>
                <td>{vehicle.tipo}</td>
                <td style={{ textAlign: "center" }}>{vehicle.capacidade}</td>
                <td>
                  <div style={{ whiteSpace: "nowrap" }}>{formatDate(vehicle.data_vencimento)}</div>
                  <div>{verificarStatus(vehicle.data_vencimento)}</div>
                </td>
                <td>
                  <div style={{ whiteSpace: "nowrap" }}>{formatDate(vehicle.data_manutencao)}</div>
                  <div>{verificarStatus(vehicle.data_manutencao)}</div>
                </td>
                <td>
                  <div style={{ whiteSpace: "nowrap" }}>{formatDate(vehicle.data_tacografo)}</div>
                  <div>{verificarStatus(vehicle.data_tacografo)}</div>
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
          {/* Campos do formulário de edição */}
          <TextField name="marca" label="Marca" value={currentVehicle.marca} onChange={handleChange} fullWidth margin="normal" />
          <TextField name="modelo" label="Modelo" value={currentVehicle.modelo} onChange={handleChange} fullWidth margin="normal" />
          <TextField name="ano_do_veiculo" label="Ano do Veículo" value={currentVehicle.ano_do_veiculo} onChange={handleChange} fullWidth margin="normal" />
          <TextField name="placa" label="Placa" value={currentVehicle.placa} onChange={handleChange} fullWidth margin="normal" />
          <TextField name="tipo" label="Tipo" value={currentVehicle.tipo} onChange={handleChange} fullWidth margin="normal" />
          <TextField name="capacidade" label="Capacidade" type="number" value={currentVehicle.capacidade} onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleEditSubmit} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Confirmação de Remoção */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirmar Remoção</DialogTitle>
        <DialogContent>Tem certeza de que deseja remover este veículo? Essa ação não pode ser desfeita.</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Função para verificar o status de vencimento das datas
const verificarStatus = (data) => {
  if (!data) return "⚪ Sem Data"; // Se a data estiver vazia, retorna "Sem Data" com círculo cinza

  const hoje = new Date();
  const dataVerificada = new Date(data);
  const diferenca = (dataVerificada - hoje) / (1000 * 60 * 60 * 24);

  if (diferenca < 0) return "🔴 Vencido";
  if (diferenca <= 30) return "🟠 Prestes a vencer";
  return "🟢 Em dia";
};

export default VehicleList;

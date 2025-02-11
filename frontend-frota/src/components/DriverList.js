import { useEffect, useState } from "react";
import { fetchDrivers, deleteDriver, updateDriver } from "../services/api";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [currentDriver, setCurrentDriver] = useState({
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
    validade_toxicologico: "",
    validade_curso: "",
    validade_cnh: "",
  });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    const data = await fetchDrivers();
    setDrivers(data);
  };

  const handleDeleteClick = (id) => {
    setSelectedDriverId(id);
    setOpenConfirmDialog(true); // Abre o modal de confirmação
  };

  const handleConfirmDelete = async () => {
    if (selectedDriverId) {
      await deleteDriver(selectedDriverId);
      setOpenConfirmDialog(false); // Fecha o modal
      loadDrivers(); // Atualiza a lista
    }
  };

  const handleEditClick = (driver) => {
    setCurrentDriver(driver);
    setOpenEditModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await updateDriver(currentDriver.id, currentDriver);
      alert("Motorista atualizado com sucesso!");
      // Aqui você pode fechar o modal ou atualizar a lista de motoristas
    } catch (error) {
      alert(error.message); // Mostra o erro real para o usuário
    }
  };
  

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  const handleChange = (e) => {
    setCurrentDriver({ ...currentDriver, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Lista de Motoristas</h2>
      {drivers.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Validade Toxicológico</th>
              <th>Validade Cursos</th>
              <th>Validade CNH</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.nome}</td>
                <td>{driver.cpf}</td>
                <td>{driver.telefone}</td>
                <td>
                  {driver.validade_toxicologico}
                  <span>{verificarStatus(driver.validade_toxicologico)}</span>
                </td>
                <td>
                  {driver.validade_curso}
                  <span>{verificarStatus(driver.validade_curso)}</span>
                </td>
                <td>
                  {driver.validade_cnh}
                  <span>{verificarStatus(driver.validade_cnh)}</span>
                </td>
                <td>
                  <button onClick={() => handleEditClick(driver)}>✏️ Editar</button>
                  <button onClick={() => handleDeleteClick(driver.id)}>❌ Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum motorista cadastrado.</p>
      )}

      {/* Modal de Edição */}
      <Dialog open={openEditModal} onClose={handleCloseModal}>
        <DialogTitle>Editar Motorista</DialogTitle>
        <DialogContent>
          <TextField
            name="nome"
            label="Nome"
            value={currentDriver.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="cpf"
            label="CPF"
            value={currentDriver.cpf}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="telefone"
            label="Telefone"
            value={currentDriver.telefone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="validade_toxicologico"
            label="Validade Toxicológico"
            type="date"
            value={currentDriver.validade_toxicologico}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="validade_curso"
            label="Validade Curso"
            type="date"
            value={currentDriver.validade_curso}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="validade_cnh"
            label="Validade CNH"
            type="date"
            value={currentDriver.validade_cnh}
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
          Tem certeza de que deseja remover este motorista? Essa ação não pode ser desfeita.
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

export default DriverList;

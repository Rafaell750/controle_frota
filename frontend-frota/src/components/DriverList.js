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
import DriverForm from "./DriverForm"; // Importa o componente DriverForm para cadastrar motoristas

// Componente que exibe a lista de motoristas e permite editar, remover e cadastrar novos
const DriverList = () => {
  // Estado para armazenar a lista de motoristas
  const [drivers, setDrivers] = useState([]);

  // Estado para controlar a abertura dos modais
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDriverForm, setOpenDriverForm] = useState(false);

  // Estado para armazenar o motorista selecionado para edição ou remoção
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  // Estado para armazenar os dados do motorista que está sendo editado
  const [currentDriver, setCurrentDriver] = useState({
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
    validade_toxicologico: "",
    validade_curso: "",
    validade_cnh: "",
  });

  // Carrega a lista de motoristas ao montar o componente
  useEffect(() => {
    loadDrivers();
  }, []);

  // Função para buscar motoristas da API
  const loadDrivers = async () => {
    const data = await fetchDrivers();
    setDrivers(data);
  };

  // Abre o modal de confirmação para deletar um motorista
  const handleDeleteClick = (id) => {
    setSelectedDriverId(id);
    setOpenConfirmDialog(true);
  };

  // Confirma a remoção do motorista selecionado
  const handleConfirmDelete = async () => {
    if (selectedDriverId) {
      await deleteDriver(selectedDriverId);
      setOpenConfirmDialog(false); // Fecha o modal
      loadDrivers(); // Atualiza a lista de motoristas
    }
  };

  // Abre o modal de edição e define os dados do motorista a ser editado
  const handleEditClick = (driver) => {
    setCurrentDriver(driver);
    setOpenEditModal(true);
  };

  // Salva as alterações feitas no motorista
  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await updateDriver(currentDriver.id, currentDriver);
      alert("Motorista atualizado com sucesso!");
      setOpenEditModal(false); // Fecha o modal
      loadDrivers(); // Atualiza a lista
    } catch (error) {
      alert(error.message); // Mostra o erro real para o usuário
    }
  };

  // Fecha o modal de edição
  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  // Atualiza os dados do motorista enquanto o usuário digita no formulário de edição
  const handleChange = (e) => {
    setCurrentDriver({ ...currentDriver, [e.target.name]: e.target.value });
  };

  // Função para formatar a data no formato "DD/MM/AAAA"
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Evita erros caso o valor seja nulo
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h2>Cadastro e Lista de Motoristas</h2>

      {/* Botão para abrir o formulário de cadastro */}
      <Button variant="contained" color="primary" onClick={() => setOpenDriverForm(true)}>
        Cadastrar Motorista
      </Button>

      {/* Modal de Cadastro de Motorista */}
      <DriverForm
        open={openDriverForm}
        onClose={() => setOpenDriverForm(false)}
        onDriverAdded={loadDrivers} // Atualiza a lista quando um motorista é cadastrado
      />

      {/* Exibe a lista de motoristas se houver motoristas cadastrados */}
      {drivers.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>#</th>
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
            {drivers.map((driver, index) => (
              <tr key={driver.id}>
                <td>{index + 1}</td>
                <td>{driver.nome}</td>
                <td>{driver.cpf}</td>
                <td>{driver.telefone}</td>
                <td>
                  <div style={{ whiteSpace: "nowrap" }}>{formatDate(driver.validade_toxicologico)}</div>
                  <div>{verificarStatus(driver.validade_toxicologico)}</div>
                </td>
                <td>
                  <div style={{ whiteSpace: "nowrap" }}>{formatDate(driver.validade_curso)}</div>
                  <div>{verificarStatus(driver.validade_curso)}</div>
                </td>
                <td>
                  <div style={{ whiteSpace: "nowrap" }}>{formatDate(driver.validade_cnh)}</div>
                  <div>{verificarStatus(driver.validade_cnh)}</div>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <div style={{ marginBottom: "5px" }}>
                    <button onClick={() => handleEditClick(driver)}>✏️ Editar</button>
                  </div>
                  <div>
                    <button onClick={() => handleDeleteClick(driver.id)}>❌ Remover</button>
                  </div>
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
          <TextField name="nome" label="Nome" value={currentDriver.nome} onChange={handleChange} fullWidth margin="normal" />
          <TextField name="cpf" label="CPF" value={currentDriver.cpf} onChange={handleChange} fullWidth margin="normal" />
          <TextField name="telefone" label="Telefone" value={currentDriver.telefone} onChange={handleChange} fullWidth margin="normal" />
          <TextField name="validade_toxicologico" label="Validade Toxicológico" type="date" value={currentDriver.validade_toxicologico} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField name="validade_curso" label="Validade Curso" type="date" value={currentDriver.validade_curso} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField name="validade_cnh" label="Validade CNH" type="date" value={currentDriver.validade_cnh} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleEditSubmit} color="primary">Salvar</Button>
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
          <Button onClick={handleConfirmDelete} color="error">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Função que verifica o status da validade e exibe um alerta visual
const verificarStatus = (data) => {
  if (!data) return "⚪ Sem Data"; // Se a data estiver vazia, retorna "Sem Data" com círculo cinza

  const hoje = new Date();
  const dataVerificada = new Date(data);
  const diferenca = (dataVerificada - hoje) / (1000 * 60 * 60 * 24);

  if (diferenca < 0) return "🔴 Vencido";
  if (diferenca <= 30) return "🟠 Prestes a vencer";
  return "🟢 Em dia";
};

export default DriverList;

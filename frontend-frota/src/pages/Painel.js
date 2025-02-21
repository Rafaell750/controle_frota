import React, { useEffect, useState } from "react";
import { fetchVehicles, fetchDrivers } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  EmojiPeople as DriverIcon,
  DirectionsCar as VehicleIcon,
  CheckCircle as EmDiaIcon,
  Warning as PrestesVencerIcon,
  Error as VencidoIcon,
} from "@mui/icons-material";

const Painel = () => {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const vehiclesData = await fetchVehicles();
      const driversData = await fetchDrivers();
      setVehicles(vehiclesData);
      setDrivers(driversData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para contar itens por status
  const countByStatus = (items, field) => {
    const today = new Date();
    const oneMonthFromNow = new Date(today);
    oneMonthFromNow.setMonth(today.getMonth() + 1); // Data de um mês a partir de hoje

    return {
      emDia: items.filter((item) => new Date(item[field]) > oneMonthFromNow).length,
      prestesVencer: items.filter(
        (item) =>
          new Date(item[field]) > today &&
          new Date(item[field]) <= oneMonthFromNow
      ).length,
      vencido: items.filter((item) => new Date(item[field]) <= today).length,
    };
  };

  // Dados dos motoristas
  const totalMotoristas = drivers.length;
  const cnhStatus = countByStatus(drivers, "validade_cnh");
  const toxicoStatus = countByStatus(drivers, "validade_toxicologico");
  const cursoStatus = countByStatus(drivers, "validade_curso");

  // Dados dos veículos
  const totalVeiculos = vehicles.length;
  const manutencaoStatus = countByStatus(vehicles, "data_manutencao");
  const seguroStatus = countByStatus(vehicles, "data_vencimento");
  const tacografoStatus = countByStatus(vehicles, "data_tacografo");
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {/* Card de Motoristas */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <DriverIcon fontSize="large" color="primary" />
                <Typography variant="h5" component="div" sx={{ ml: 2 }}>
                  Motoristas
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Total cadastrados: {totalMotoristas}
              </Typography>
              <StatusItem
                label="CNH:"
                emDia={cnhStatus.emDia}
                prestesVencer={cnhStatus.prestesVencer}
                vencido={cnhStatus.vencido}
              />
              <StatusItem
                label="Exame Toxicológico:"
                emDia={toxicoStatus.emDia}
                prestesVencer={toxicoStatus.prestesVencer}
                vencido={toxicoStatus.vencido}
              />
              <StatusItem
                label="Curso:"
                emDia={cursoStatus.emDia}
                prestesVencer={cursoStatus.prestesVencer}
                vencido={cursoStatus.vencido}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Veículos */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <VehicleIcon fontSize="large" color="secondary" />
                <Typography variant="h5" component="div" sx={{ ml: 2 }}>
                  Veículos
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Total cadastrados: {totalVeiculos}
              </Typography>
              <StatusItem
                label="Manutenção:"
                emDia={manutencaoStatus.emDia}
                prestesVencer={manutencaoStatus.prestesVencer}
                vencido={manutencaoStatus.vencido}
              />
              <StatusItem
                label="Seguro:"
                emDia={seguroStatus.emDia}
                prestesVencer={seguroStatus.prestesVencer}
                vencido={seguroStatus.vencido}
              />
              <StatusItem
                label="Tacógrafo:"
                emDia={tacografoStatus.emDia}
                prestesVencer={tacografoStatus.prestesVencer}
                vencido={tacografoStatus.vencido}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Componente para exibir o status (Em dia, Prestes a vencer, Vencido)
const StatusItem = ({ label, emDia, prestesVencer, vencido }) => (
  <Box mt={2}>
    <Typography variant="h6" component="div">
      {label}
    </Typography>
    <Box display="flex" alignItems="center" mt={1}>
      <EmDiaIcon fontSize="small" color="success" />
      <Typography variant="body2" sx={{ ml: 1, mr: 2, fontWeight: "bold", fontSize: "1.2rem", color: "#4caf50" }}>
        Em dia - {emDia}
      </Typography>
      <PrestesVencerIcon fontSize="small" color="warning" />
      <Typography variant="body2" sx={{ ml: 1, mr: 2, fontWeight: "bold", fontSize: "1.2rem", color: "#ff9800" }}>
        Prestes a vencer - {prestesVencer}
      </Typography>
      <VencidoIcon fontSize="small" color="error" />
      <Typography variant="body2" sx={{ ml: 1, fontWeight: "bold", fontSize: "1.2rem", color: "#f44336" }}>
        Vencido - {vencido}
      </Typography>
    </Box>
  </Box>
);

export default Painel;
const API_URL = "http://127.0.0.1:5000";

export const fetchVehicles = async () => {
    try {
      const response = await fetch(`${API_URL}/veiculos`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      throw error; // Propaga o erro para ser tratado no componente
    }
  };

export const fetchDrivers = async () => {
  try {
    const response = await fetch(`${API_URL}/motoristas`);
      if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      return await response.json();
  } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
      throw error;
  }
};



export const addVehicle = async (vehicle) => {
  const response = await fetch(`${API_URL}/veiculos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });
  return response.json();
};

export const addDriver = async (driverData) => {
  try {
    const response = await fetch(`${API_URL}/motoristas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driverData),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar motorista");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
    await fetch(`${API_URL}/veiculos/${id}`, { method: "DELETE" });
  };

  export const deleteDriver = async (driverId) => {
    const response = await fetch(`${API_URL}/motoristas/${driverId}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Erro ao excluir motorista");
    }
  
    return response.json();
  };
  
async function fetchDashboardData() {
    try {
        const response = await fetch(`${API_URL}/dashboard`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();
        renderDashboard(data);
    } catch (error) {
        console.error("Erro ao carregar dados do painel:", error);
    }
}

function renderDashboard(data) {
    document.getElementById("totalVeiculos").textContent = data.total_veiculos;
    document.getElementById("totalMotoristas").textContent = data.total_motoristas;
    document.getElementById("vencimentosProximos").textContent = data.vencimentos_proximos;
}

document.addEventListener("DOMContentLoaded", fetchDashboardData);


  
  
  
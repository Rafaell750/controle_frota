// URL base da API
const API_URL = "http://127.0.0.1:5000"; // API para testes (localhost)
//const API_URL = "http://172.16.21.12:5000"; // API servidor final


/**
 * Função para buscar a lista de veículos da API.
 * returns {Promise<Array>} Retorna uma lista de veículos.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
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

/**
 * Função para buscar a lista de motoristas da API.
 * returns {Promise<Array>} Retorna uma lista de motoristas.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
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

/**
 * Função para adicionar um novo veículo.
 * param {Object} vehicle - Dados do veículo a ser adicionado.
 * returns {Promise<Object>} Retorna a resposta da API.
 */
export const addVehicle = async (vehicle) => {
  try {
    const response = await fetch(`${API_URL}/veiculos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle),
    });

    const data = await response.json(); // Captura a resposta JSON

    if (!response.ok) {
      throw new Error(data.erro || "Erro ao cadastrar veículo"); // Lança o erro com a mensagem do backend
    }

    return data; // Retorna os dados em caso de sucesso
  } catch (error) {
    console.error("Erro ao cadastrar veículo:", error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};

/**
 * Função para adicionar um novo motorista.
 * param {Object} driverData - Dados do motorista a ser adicionado.
 * returns {Promise<Object>} Retorna a resposta da API.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
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

/**
 * Função para deletar um veículo pelo ID.
 * param {string} id - ID do veículo a ser deletado.
 */
export const deleteVehicle = async (id) => {
  await fetch(`${API_URL}/veiculos/${id}`, { method: "DELETE" });
};

/**
 * Função para deletar um motorista pelo ID.
 * param {string} driverId - ID do motorista a ser deletado.
 * returns {Promise<Object>} Retorna a resposta da API.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
export const deleteDriver = async (driverId) => {
  const response = await fetch(`${API_URL}/motoristas/${driverId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir motorista");
  }

  return response.json();
};

/**
 * Função para buscar dados do painel (dashboard) da API.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
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

/**
 * Função para renderizar os dados do painel (dashboard) na interface.
 * param {Object} data - Dados do painel a serem renderizados.
 */
function renderDashboard(data) {
  document.getElementById("totalVeiculos").textContent = data.total_veiculos;
  document.getElementById("totalMotoristas").textContent = data.total_motoristas;
  document.getElementById("vencimentosProximos").textContent = data.vencimentos_proximos;
}

// Evento que carrega os dados do painel quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", fetchDashboardData);

/**
 * Função para buscar um motorista pelo ID.
 * param {string} id - ID do motorista a ser buscado.
 * returns {Promise<Object>} Retorna os dados do motorista.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
export const fetchDriverById = async (id) => {
  const response = await fetch(`${API_URL}/motoristas/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar motorista");
  return await response.json();
};

/**
 * Função para buscar um veículo pelo ID.
 * param {string} id - ID do veículo a ser buscado.
 * returns {Promise<Object>} Retorna os dados do veículo.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
export const fetchVehicleById = async (id) => {
  const response = await fetch(`${API_URL}/veiculos/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar veículo");
  return await response.json();
};

/**
 * Função para atualizar os dados de um motorista.
 * param {string} id - ID do motorista a ser atualizado.
 * param {Object} driverData - Novos dados do motorista.
 * returns {Promise<Object>} Retorna a resposta da API.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
export const updateDriver = async (id, driverData) => {
  try {
    const response = await fetch(`${API_URL}/motoristas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driverData),
    });

    const data = await response.json(); // Captura a resposta JSON

    if (!response.ok) {
      throw new Error(data.erro || "Erro ao atualizar motorista");
    }

    return data; // Retorna a resposta para ser usada no front-end

  } catch (error) {
    console.error("Erro ao atualizar motorista:", error.message);
    throw error; // Lança o erro para ser tratado no componente React
  }
};


/**
 * Função para atualizar os dados de um veículo.
 * param {string} id - ID do veículo a ser atualizado.
 * param {Object} vehicleData - Novos dados do veículo.
 * returns {Promise<Object>} Retorna a resposta da API.
 * throws {Error} Lança um erro caso a requisição falhe.
 */
export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await fetch(`${API_URL}/veiculos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json(); // Captura a resposta JSON

    if (!response.ok) {
      throw new Error(data.erro || "Erro ao atualizar veículo");
    }

    return data; // Retorna a resposta para ser usada no front-end

  } catch (error) {
    console.error("Erro ao atualizar veículo:", error.message);
    throw error; // Lança o erro para ser tratado no componente React
  }
};


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
  const response = await fetch(`${API_URL}/motoristas`);
  return response.json();
};

export const addVehicle = async (vehicle) => {
  const response = await fetch(`${API_URL}/veiculos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });
  return response.json();
};

export const addDriver = async (driver) => {
  const response = await fetch(`${API_URL}/motoristas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(driver),
  });
  return response.json();
};

export const deleteVehicle = async (id) => {
    await fetch(`${API_URL}/veiculos/${id}`, { method: "DELETE" });
  };

  export const registerUser = async (user) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  
    return response.json();
  };
  
  export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  
    return response.json();
  };
  
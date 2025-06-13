import CONFIG from "./BaseUrlAPI";

// Endpoint
const ENDPOINTS = {
  BASE_URL: CONFIG.BASE_URL,
};

export const registerModel = {
  async register(name, email, password) {
    console.log(ENDPOINTS.BASE_URL);
    const response = await fetch(ENDPOINTS.BASE_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to register");
    }

    return result;
  },
};

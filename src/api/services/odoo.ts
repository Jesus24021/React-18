export const fetchOdooProducts = async () => {
  try {
    const response = await fetch("http://adminfer.test/api/odoo/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (json.result) {
      return json.result;
    } else if (json.error) {
      throw new Error(json.error.message || "Error desconocido desde Laravel");
    } else {
      throw new Error("Respuesta inesperada desde Laravel");
    }
  } catch (error: any) {
    throw new Error("Error al consumir la API: " + error.message);
  }
};

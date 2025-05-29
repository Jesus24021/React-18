// Función para consumir la API
export async function consumirApi(
  url: string,
  timeout: number = 5000
): Promise<any> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    // Se invoca una solicitud GET a la URL especificada
    const response = await fetch(url, { signal: controller.signal });

    // Si la respuesta no es exitosa (status no es 2xx), se lanza un error
    if (!response.ok) {
      throw new Error(
        `Error al consumir la API: ${response.status} - ${response.statusText}`
      );
    }

    // Parseamos la respuesta JSON y se retorna
    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.error("La solicitud fue cancelada por timeout");
    } else {
      console.error("Ocurrió un error:", error.message);
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}

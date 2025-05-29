// api.ts

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any; // Puede ser un objeto, string, FormData, etc.
  timeout?: number; // Timeout en milisegundos
}

/**
 * Función genérica para consumir la API.
 * @param url La URL del endpoint.
 * @param options Opciones de la solicitud (método, cabeceras, cuerpo, timeout).
 * @returns Una promesa que resuelve con los datos de la respuesta JSON.
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', headers, body, timeout = 5000 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json', // Por defecto, enviamos JSON
        ...headers, // Permite sobrescribir o añadir otras cabeceras
      },
      signal: controller.signal,
    };

    // Si el método es POST o PUT y hay un cuerpo, lo convertimos a JSON
    if (body && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(body);
    } else if (body && method === 'DELETE') {
      // Para DELETE, el cuerpo es menos común, pero lo incluimos si existe
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      // Aquí, lanzamos un error que incluye el status y el statusText para un mejor manejo
      const errorData = await response.json().catch(() => ({})); // Intenta parsear error body
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || response.statusText || 'Error desconocido'
        }`
      );
    }

    // Para respuestas sin contenido (ej. 204 No Content), no intentamos parsear JSON
    if (response.status === 204) {
      return null as T; // O undefined, dependiendo de tu preferencia
    }

    const data: T = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('La solicitud fue cancelada por timeout:', url);
      throw new Error('La solicitud tardó demasiado en responder (timeout).');
    } else if (error instanceof SyntaxError) {
      console.error('Error al parsear JSON de la respuesta:', error);
      throw new Error(
        'Error al interpretar la respuesta del servidor (JSON inválido).'
      );
    } else if (error.message.includes('Failed to fetch')) {
      console.error('Error de red:', error);
      throw new Error('Error de red: no se pudo conectar con el servidor.');
    } else {
      console.error('Ocurrió un error en la solicitud:', error);
      throw error; // Relanza el error original
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
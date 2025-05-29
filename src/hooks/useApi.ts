// Importamos React y los hooks useEffect y useState
import { useEffect, useState } from "react";
import { consumirApi } from "../api/services/api"; // Ajusta la ruta según tu estructura

export function useApi(url: string) {
  // Se define el estado 'dataAPI' que almacenará los usurios de la API (al inicio estará vacío)
  const [dataAPI, setData] = useState<any[]>([]); // Se usará un array vacío porque la respuesta es una lista de objetos

  /* ++ useState es un hook de React que permite declarar variables de estado en componentes funcionales,
        es decir usando programación funcional.
     ++ <string | null> indica que el estado puede tener dos posibles tipos: una cadena (string) o null.
     ++ (null) es el valor inicial del estado.
  */
  const [error, setError] = useState<string | null>(null);

  // useEffect se ejecuta después de que el componente se renderiza, y solo se ejecuta una vez
  useEffect(() => {
    consumirApi(url) // Se invoca a la función 'consumirApi' pasando la URL
      .then((resultado) => {
        setData
          (resultado.original.data); 
      })
      .catch((err) => {
        // Si ocurre un error, se almacena en el estado 'error'
        // 1. Error de red
        if (err.name === "TypeError" && err.message === "Failed to fetch") {
          setError("Error de red: no se pudo conectar con el servidor.");
        }
        // 2. Timeout o conexión lenta (simulación, si se implementa timeout en consumirApi)
        else if (err.name === "AbortError") {
          setError("La solicitud tardó demasiado en responder (timeout).");
        }
        // 3. Error al parsear JSON
        else if (err instanceof SyntaxError) {
          setError(
            "Error al interpretar la respuesta del servidor (JSON inválido)."
          );
        }
        // 4. Error Página no encontrada
        else if (err.status === 404) {
          setError("Recurso no encontrado (Error 404). Verifica la URL.");
        }
        // 5. Error genérico (otros)
        else {
          setError("Hubo un error; no se qué pasó: " + err.status);
        }
      });
  }, [url]);

  return { dataAPI, error };
}

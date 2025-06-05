import { useEffect, useState } from "react";

export function useOdooProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://adminfer.test/api/odoo/products");
        if (!response.ok) {
          throw new Error("Error HTTP: " + response.status);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError("Error al consumir la API: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, error, loading };
}

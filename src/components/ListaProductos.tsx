import React from "react";
import { useOdooProducts } from "../hooks/useOdooProducts";

export const ProductList = () => {
  const { products, error, loading } = useOdooProducts();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            <strong>{prod.name}</strong> - Código: {prod.default_code} - Precio:
            ${prod.lst_price} - Stock: {prod.qty_available}
          </li>
        ))}
      </ul>
    </div>
  );
};

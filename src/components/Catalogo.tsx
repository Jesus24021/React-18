import React from "react";
import { useOdooProducts } from "../hooks/useOdooProducts";

export const ProductTable = () => {
  const { products, error, loading } = useOdooProducts();

  if (loading) return <p style={styles.loading}>Cargando productos...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Catálogo de productos (Odoo)</h1>
      <h2 style={styles.subtitle}>Lista de productos</h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.headerCell}>Nombre</th>
            <th style={styles.headerCell}>Código</th>
            <th style={styles.headerCell}>Precio</th>
            <th style={styles.headerCell}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} style={styles.dataRow}>
              <td style={styles.cell}>{prod.name}</td>
              <td style={styles.cell}>{prod.default_code}</td>
              <td style={styles.cell}>${prod.lst_price}</td>
              <td style={styles.cell}>{prod.qty_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "20px",
    color: "#34495e",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  headerRow: {
    backgroundColor: "#2c3e50",
    color: "#ffffff",
  },
  headerCell: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  dataRow: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #eee",
    transition: "background-color 0.2s ease-in-out",
  },
  cell: {
    padding: "10px",
    textAlign: "left",
  },
  error: {
    color: "red",
    padding: "10px",
  },
  loading: {
    padding: "10px",
    fontStyle: "italic",
  },
};

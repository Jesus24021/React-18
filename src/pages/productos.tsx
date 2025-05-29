import React from "react";
import Tableproducts from "../components/Productos";

const productos: React.FC = () => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Productos</h1>

      <Tableproducts />
    </div>
  );
};

export default productos;

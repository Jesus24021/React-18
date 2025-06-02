import React from "react";
import Tablecategorias from "../components/Categories";

const Categorias: React.FC = () => {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4 text-center">Categorías</h1>
      <Tablecategorias />
    </div>
  );
};

export default Categorias;

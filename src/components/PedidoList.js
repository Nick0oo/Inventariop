import { useState, useEffect } from "react";
import { getPedidos } from "../api";
import { PedidoCard } from "./PedidoCard";

export const PedidoList = () => {
  const [pedidos, setPedidos] = useState([]);

  const getLinks = async () => {
    const querySnapshot = await getPedidos();
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setPedidos(docs);
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      {pedidos.map((pedido) => (
        <div className="col-md-4" key={pedido.id}>
          <PedidoCard pedido={pedido} />
        </div>
      ))}
    </>
  );
};

import { useEffect, useState } from "react";
import { getVentas } from "../api";
import { VentasCard } from "./VentasCard";

export const VentasList = () => {
  const [ventas, setVentas] = useState([]);

  const getVentasData = async () => {
    const querySnapshot = await getVentas();
    const ventasData = [];
    querySnapshot.forEach((doc) => {
      ventasData.push({ ...doc.data(), id: doc.id });
    });
    setVentas(ventasData);
  };

  useEffect(() => {
    getVentasData();
  }, []);

  return (
    <>
      {ventas.map((venta) => (
        <div className="col-md-4" key={venta.id}>
          <VentasCard venta={venta} />
        </div>
      ))}
    </>
  );
};

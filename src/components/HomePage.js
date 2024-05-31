import { WebsiteList } from "./WebsiteList";
import { PedidoList } from "./PedidoList";
import { VentasList} from "./VentasList";

export const HomePage = () => {
  return (
    <div className="container mt-4">
      <h2>Inventario</h2>
      <WebsiteList />
      <hr className="my-4" />
      <h2>Pedidos</h2>
      <PedidoList />
      <hr className="my-4" />
      <h2>Ventas</h2>
      <VentasList />
      
    </div>
  );
};

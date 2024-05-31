import { deletePedido } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function PedidoCard({ pedido }) {
  const navigate = useNavigate();

  const onDeletePedido = async (id) => {
    if (window.confirm("¿Estás seguro de borrar el pedido?")) {
      await deletePedido(id);
      toast("Pedido eliminado satisfactoriamente", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className="card mb-30 card-pedido"
      key={pedido.id}
      onClick={() => navigate(`/editPedido/${pedido.id}`)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between mb-45">
          <div className="mb-500">
            <h4>{pedido.nombreReceptor}</h4>
            <h6>{pedido.telefono}</h6>
            <h6>{pedido.cedula}</h6>
            <h6>{pedido.direccion}</h6>
            <h6>{pedido.notas}</h6>
            <h6>{pedido.fechaEntrega}</h6>
            <h6>{pedido.estado}</h6>
          </div>
          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
              onDeletePedido(pedido.id);
            }}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>
  );
}

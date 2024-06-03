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
      className="card mb-3 card-custom"
      key={pedido.id}
      onClick={() => navigate(`/editPedido/${pedido.id}`)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h4 className="card-title">{pedido.nombreReceptor}</h4>
            <p className="card-text">Teléfono: {pedido.telefono}</p>
            <p className="card-text">Cédula: {pedido.cedula}</p>
            <p className="card-text">Dirección: {pedido.direccion}</p>
            <p className="card-text">Notas: {pedido.notas}</p>
            <p className="card-text">Fecha de Entrega: {pedido.fechaEntrega}</p>
            <p className="card-text">Estado: {pedido.estado}</p>
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

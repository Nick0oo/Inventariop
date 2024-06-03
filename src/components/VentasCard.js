import { deleteVenta } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function VentasCard({ venta }) {
  const navigate = useNavigate();

  const onDeleteVenta = async (id) => {
    if (window.confirm("¿Estás seguro de borrar la venta?")) {
      await deleteVenta(id);
      toast("Venta eliminada satisfactoriamente", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className="card mb-3 card-custom"
      key={venta.id}
      onClick={() => navigate(`/editVenta/${venta.id}`)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h4 className="card-title">{venta.productoVendido}</h4>
            <p className="card-text">{venta.cantidad} unidades</p>
            <p className="card-text">{venta.vendedor}</p>
            <p className="card-text">{venta.fechaVenta}</p>
          </div>
          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteVenta(venta.id);
            }}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>
  );
}

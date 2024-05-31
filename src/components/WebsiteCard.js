import { deleteWebsite } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function WebsiteCard({ link }) {
  const navigate = useNavigate();

  const onDeleteLink = async (id) => {
    if (window.confirm("¿Estás seguro de borrar el producto?")) {
      await deleteWebsite(id);
      toast("Producto eliminado satisfactoriamente", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const getDescription = (value) => {
    switch (value) {
      case "option1":
        return "VENTA";
      case "option2":
        return "INGREDIENTE";
      default:
        return "VENTA";
    }
  };

  return (
    <div
      className="card mb-3 card-website"
      key={link.id}
      onClick={() => navigate(`/edit/${link.id}`)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h4>{link.nombre}</h4>
            <h6>{getDescription(link.categoria)}</h6>
            <h6>{link.precio}$</h6>
            <h6>{link.cantidad}</h6>
          </div>
          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteLink(link.id);
            }}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>
  );
}


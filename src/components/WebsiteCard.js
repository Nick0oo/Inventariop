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
      className="card mb-3 card-website card-custom"
      key={link.id}
      onClick={() => navigate(`/edit/${link.id}`)}
    >
      <div className="card-body d-flex">
        <div className="flex-grow-1">
          <h4 className="card-title">{link.nombre}</h4>
          <p className="card-text">{getDescription(link.categoria)}</p>
          <p className="card-text">{link.precio}$</p>
          <p className="card-text">{link.cantidad}</p>
        </div>
        <div className="divisora mx-3"></div>
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
  );
}

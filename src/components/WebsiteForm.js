import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveWebsite, getWebsite, updateWebsite } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  nombre: "",
  precio: "",
  categoria: "",
  cantidad: "",
};

export const WebsiteForm = (props) => {
  const [website, setWebsite] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setWebsite({ ...website, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!params.id) {
      await saveWebsite(website);
      toast("Agregado a Inventario", {
        type: "success",
      });
    } else {
      await updateWebsite(params.id, website);
      toast("Producto Actualizado ", {
        type: "success",
      });
    }

    // Clean Form
    setWebsite(initialState);
    navigate("/");
  };

  const getLinkById = async (id) => {
    try {
      const doc = await getWebsite(id);
      setWebsite({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);

  return (
    <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <label htmlFor="nombre">Ingresa Tu Producto</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">add_box</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Tu Producto Aqui"
            value={website.nombre}
            name="nombre"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="precio">Precio del Producto</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">attach_money</i>
          </div>
          <input
            type="Number"
            value={website.precio}
            name="precio"
            placeholder="Precio $"
            className="form-control mb-"
            onChange={handleInputChange}
          />
        </div>
        
        <label htmlFor="cantidad">Cantidad</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">add_box</i>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder="Cantidad"
            value={website.cantidad}
            name="cantidad"
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="categoria">Ingresa Su Categoria:</label>
        <select
          className="form-control mb-3"
          name="categoria"
          value={website.categoria}
          onChange={handleInputChange}
        >
          <option value="option1">VENTA</option>
          <option value="option2">INGREDIENTE</option>
        </select>


        <button
          className="btn btn-primary btn-block"
          disabled={!website.nombre || !website.precio || !website.categoria || !website.cantidad}
        >
          {props.currentId === "" ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
};

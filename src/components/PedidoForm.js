import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { savePedido, getPedido, updatePedido } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  nombreReceptor: "",
  telefono: "",
  cedula: "",
  direccion: "",
  notas: "",
  fechaEntrega: "",
  estado: "",
};

export const PedidoForm = () => {
  const [pedido, setPedido] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setPedido({ ...pedido, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!params.id) {
      await savePedido(pedido);
      toast("Nuevo Pedido Añadido", {
        type: "success",
      });
    } else {
      await updatePedido(params.id, pedido);
      toast("Pedido Actualizado", {
        type: "success",
      });
    }

    setPedido(initialState);
    navigate("/pedidos");
  };

  const getPedidoById = async (id) => {
    try {
      const doc = await getPedido(id);
      setPedido({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPedidoById(params.id);
    }
  }, [params.id]);

  return (
    <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <label htmlFor="nombreReceptor">Nombre del Receptor</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">person</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del Receptor"
            name="nombreReceptor"
            value={pedido.nombreReceptor}
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="telefono">Teléfono</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">phone</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Teléfono"
            name="telefono"
            value={pedido.telefono}
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="cedula">Cédula</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">credit_card</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Cédula"
            name="cedula"
            value={pedido.cedula}
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="direccion">Dirección</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">home</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Dirección"
            name="direccion"
            value={pedido.direccion}
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="notas">Notas del Pedido</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">note</i>
          </div>
          <textarea
            className="form-control"
            placeholder="Notas del Pedido"
            name="notas"
            value={pedido.notas}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <label htmlFor="fechaEntrega">Fecha de Entrega</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">date_range</i>
          </div>
          <input
            type="date"
            className="form-control"
            placeholder="Fecha de Entrega"
            name="fechaEntrega"
            value={pedido.fechaEntrega}
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="estado">Estado</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-">
            <i className="material-icons">assignment</i>
          </div>
          <select
            className="form-control"
            name="estado"
            value={pedido.estado}
            onChange={handleInputChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="enviado">Enviado</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>

        <button className="btn btn-primary btn-block">
          {params.id ? "Actualizar Pedido" : "Añadir Pedido"}
        </button>
      </form>
    </div>
  );
};

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
        <input
          type="text"
          name="nombreReceptor"
          value={pedido.nombreReceptor}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <label htmlFor="telefono">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={pedido.telefono}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <label htmlFor="cedula">Cédula</label>
        <input
          type="text"
          name="cedula"
          value={pedido.cedula}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <label htmlFor="direccion">Dirección</label>
        <input
          type="text"
          name="direccion"
          value={pedido.direccion}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <label htmlFor="notas">Notas del Pedido</label>
        <textarea
          name="notas"
          value={pedido.notas}
          onChange={handleInputChange}
          className="form-control mb-3"
        ></textarea>
        <label htmlFor="fechaEntrega">Fecha de Entrega</label>
        <input
          type="date"
          name="fechaEntrega"
          value={pedido.fechaEntrega}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <label htmlFor="estado">Estado</label>
        <select
          name="estado"
          value={pedido.estado}
          onChange={handleInputChange}
          className="form-control mb-3"
        >
          <option value="pendiente">Pendiente</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
        </select>
        <button className="btn btn-primary btn-block">
          {params.id ? "Actualizar Pedido" : "Añadir Pedido"}
        </button>
      </form>
    </div>
  );
};

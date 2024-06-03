import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveVenta, getVenta, updateVenta, getWebsite, updateWebsite } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  productoVendido: "",
  cantidad: "",
  vendedor: "",
  fechaVenta: "",
};

export const VentasForm = () => {
  const [venta, setVenta] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setVenta({ ...venta, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!params.id) {
      await saveVenta(venta);
      await restarInventario(venta.productoVendido, venta.cantidad);
      toast("Venta Agregada", {
        type: "success",
      });
    } else {
      await updateVenta(params.id, venta);
      toast("Venta Actualizada", {
        type: "success",
      });
    }

    setVenta(initialState);
    navigate("/");
  };

  const getVentaById = async (id) => {
    try {
      const doc = await getVenta(id);
      setVenta({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  const restarInventario = async (productoVendido, cantidadVendida) => {
    try {
      // Obtener el producto del inventario
      const productQuery = await getWebsite(productoVendido);
      if (productQuery.exists()) {
        const productData = productQuery.data();
        const nuevaCantidad = productData.cantidad - parseInt(cantidadVendida, 10);

        // Actualizar la cantidad del producto en el inventario
        await updateWebsite(productoVendido, { cantidad: nuevaCantidad });
      } else {
        console.error("Producto no encontrado en el inventario");
      }
    } catch (error) {
      console.error("Error al actualizar el inventario", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getVentaById(params.id);
    }
  }, [params.id]);

  return (
    <div className="col-md-6 offset-md-3 main-container">
      <form onSubmit={handleSubmit} className="card card-body bg-light card-custom">
        <h3>Formulario de Venta</h3>
        <label htmlFor="productoVendido">Producto Vendido</label>
        <div className="input-group mb-3">
          <div className="input-group-text">
            <i className="material-icons">add_box</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Producto Vendido"
            value={venta.productoVendido}
            name="productoVendido"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="cantidad">Cantidad</label>
        <div className="input-group mb-3">
          <div className="input-group-text">
            <i className="material-icons">add_box</i>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder="Cantidad"
            value={venta.cantidad}
            name="cantidad"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="vendedor">Vendedor</label>
        <div className="input-group mb-3">
          <div className="input-group-text">
            <i className="material-icons">person</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Vendedor"
            value={venta.vendedor}
            name="vendedor"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="fechaVenta">Fecha de Venta</label>
        <div className="input-group mb-3">
          <div className="input-group-text">
            <i className="material-icons">date_range</i>
          </div>
          <input
            type="date"
            className="form-control"
            placeholder="Fecha de Venta"
            value={venta.fechaVenta}
            name="fechaVenta"
            onChange={handleInputChange}
          />
        </div>

        <button
          className="btn btn-primary btn-block btn-custom"
          disabled={
            !venta.productoVendido ||
            !venta.cantidad ||
            !venta.vendedor ||
            !venta.fechaVenta
          }
        >
          {params.id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
};

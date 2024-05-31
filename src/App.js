import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { WebsiteForm } from "./components/WebsiteForm";
import { PedidoForm } from "./components/PedidoForm";
import { VentasForm } from "./components/VentasForm"; // Asegúrate de importar VentasForm

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="add" element={<WebsiteForm />} />
          <Route path="edit/:id" element={<WebsiteForm />} />
          <Route path="addPedido" element={<PedidoForm />} />
          <Route path="editPedido/:id" element={<PedidoForm />} />
          <Route path="addVenta" element={<VentasForm />} />
          <Route path="editVenta/:id" element={<VentasForm />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

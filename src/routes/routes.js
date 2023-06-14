import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "../pages/catalog/Catalog";
import Auth from "../pages/auth/Auth";
import Register from "../pages/register/Register";
import { Carrinho } from "../pages/carrinho";
import { GerenciaEstoque } from "../pages/estoque";
import { GerenciaPedido } from "../pages/gerencia-pedidos";
import { MeusPedidos } from "../pages/meus-pedidos";
import { GerenciaAlugueis } from "../pages/gerencia-alugueis";
import Listaluthiers from "../pages/lista-de-luthiers";

function Routing({ setCarrinho }) {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Catalog setCarrinho={setCarrinho} />} />
        <Route exact path="/estoque" element={<GerenciaEstoque />} />
        <Route exact path="/pedidos" element={<GerenciaPedido />} />
        <Route exact path="/meus-pedidos" element={<MeusPedidos />} />
        <Route exact path="/alugueis" element={<GerenciaAlugueis />} />
        <Route path="/login" element={<Auth showGoRegister={true} />} />
        <Route path="/register" element={<Register showGoLogin={true} />} />
        <Route path="/carrinho" element={<Carrinho setCarrinho={setCarrinho} />} />
        <Route path="/lista-luthiers" element={<Listaluthiers/>} />
      </Routes>
    </Router>
  );
}

export default Routing;

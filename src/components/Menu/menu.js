import { React } from "react";
import { Header, Logo, Nav, CartCount, LogoImg } from "./styles";
import { Button, IconButton } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../styles/imgs/logo.png";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { getRole, logout } from "../../services/auth";
import "../../FirebaseConfiguration";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { getAuth, signOut } from "firebase/auth";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

function Menu({ carrinho, user }) {
  var quantidade =
    carrinho.length > 0
      ? carrinho.flatMap((e) => e.quantidade).reduce((a, b) => a + b)
      : 0;
  const role = getRole();

  return (
    <>
      <Header>
        <Logo href="/">
          <LogoImg src={logo} />
          SpotFlautas
        </Logo>

        <Nav>
          {role === "ADMIN" || role === "GERENTE_ESTOQUE" ? (
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                window.location.href = "/estoque";
              }}
              className="cart-btn"
            >
              <InventoryIcon />
              Estoque
            </IconButton>
          ) : (
            <></>
          )}

          {role === "USER" ? (
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                window.location.href = "/meus-pedidos";
              }}
              className="cart-btn"
            >
              Meus Pedidos
              <AutoAwesomeMotionIcon />
            </IconButton>
          ) : (
            <></>
          )}

          {role === "ADMIN" || role === "ATENDENTE" ? (
            <>
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  window.location.href = "/pedidos";
                }}
                className="cart-btn"
              >
                <ReceiptIcon />
                Pedidos Gerais
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  window.location.href = "/alugueis";
                }}
                className="cart-btn"
              >
                <ReceiptIcon />
                Pedidos de Aluguel
              </IconButton>
            </>
          ) : (
            <></>
          )}

          {user ? (
            <>
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  window.location.href = "/lista-luthiers";
                }}
                className="cart-btn"
              >
                Luthieres
                <AutoAwesomeMotionIcon />
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  window.location.href = "/carrinho";
                }}
                className="cart-btn"
              >
                <FaShoppingCart />
                <CartCount>{quantidade}</CartCount>
                Carrinho
              </IconButton>
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  signOut(getAuth());
                  logout();
                }}
                className="cart-btn"
              >
                Logout
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <></>
          )}
        </Nav>
      </Header>
    </>
  );
}

export default Menu;

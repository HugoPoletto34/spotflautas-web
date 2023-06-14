import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CustomTable from "../../components/Table/Table";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Container } from "./styles";
import { StyledTableCell } from "../../components/Table/styles";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";

export const MeusPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const user = getAuth().currentUser;

  const columns = [
    {
      field: "pedido.id",
      headerName: "Pedido ID",
      align: "left",
      type: "string",
    },
    {
      field: "pedido.created_at",
      headerName: "Criado em",
      align: "right",
      type: "dateTime",
    },
    {
      field: "pedido.status",
      headerName: "Status",
      align: "right",
      type: "number",
    },
    {
      field: "pedido.total",
      headerName: "Total",
      align: "right",
      type: "money",
    },
  ];

  const acoes = (open, setOpen) => {
    return (
      <StyledTableCell align="right">
        <IconButton
          aria-label="expand row"
          size="small"
          color="primary"
          onClick={() => setOpen(!open)}
        >
          Ver
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </StyledTableCell>
    );
  };

  const LineCollapsable = (row, open, setOpen) => {
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <div style={{ margin: 10 }}>
            <Typography variant="h5" gutterBottom component="div">
              Produtos do pedido
            </Typography>
            <ul>
              {row.produtos.map((product) => (
                  <li key={product.id}>
                    {product.operacao === 'comprar' ? 'Compra' : 'Aluguel'} -{" "}
                    {product.nome} -{" "}
                    {product.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}{" "}
                    - {product.quantidade}{" "}
                    {product.quantidade === 1 ? product.operacao === "comprar" ? "item" : "dia" : product.operacao === "comprar" ? "itens" : "dias"}
                    {product.operacao === "alugar" ? <>
                    {" "} - Devolução:{" "}
                    {new Date(product.data_devolucao).toLocaleDateString(
                      "pt-BR"
                    )}{" "}
                    </> : null}
                  </li>
                ))}
            </ul>
          </div>
        </Box>
      </Collapse>
    );
  };

  async function fetchMyOrders() {
    const response = await api.get(`/orders/by-client/${user.uid}`);
    setPedidos(response.data);
  }

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <Container>
      <h1>Meus Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>Nenhum produto cadastrado</p>
      ) : (
        <CustomTable
          columns={columns}
          rows={pedidos}
          acoes={acoes}
          lineCollapsable={LineCollapsable}
        />
      )}
    </Container>
  );
};

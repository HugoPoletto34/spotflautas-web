import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CustomTable from "../../components/Table/Table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, ButtonGroup } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "./styles";
import { StyledTableCell } from "../../components/Table/styles";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export const GerenciaPedido = () => {
  const [pedidos, setPedidos] = useState([]);

  async function fetchPedidos() {
    const response = await api.get("/orders");
    setPedidos(response.data);
  }

  useEffect(() => {
    fetchPedidos();
  }, []);

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
    const handleSendOrder = async (event) => {
      event.preventDefault();
      var confirmed = window.confirm("Tem certeza que deseja ENVIAR pedido?");
      if (confirmed) {
        const response = await api.put(
          `/order/${row.pedido.id}/pedido-enviado`
        );
        if (response.status === 200) {
          fetchPedidos();
        }
      }
    };

    const handleRejectOrder = async (event) => {
      event.preventDefault();
      var confirmed = window.confirm("Tem certeza que deseja REJEITAR pedido?");
      if (confirmed) {
        const response = await api.put(
          `/order/${row.pedido.id}/pedido-rejeitado`
        );
        if (response.status === 200) {
          fetchPedidos();
        }
      }
    };

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
                </li>
              ))}
            </ul>
          </div>
          <div style={{ margin: 10 }}>
            <Typography variant="h6" gutterBottom component="div">
              Total do pedido
            </Typography>
            <p>
              {row.pedido.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          {/* endereço */}
          <div style={{ margin: 10 }}>
            <Typography variant="h6" gutterBottom component="div">
              Endereço do cliente:
            </Typography>
            <p>
              {row.endereco.rua}, {row.endereco.numero}, {row.endereco.complemento}, {row.endereco.bairro}, {row.endereco.cidade}, {row.endereco.estado}, {row.endereco.cep}
            </p>
          </div>


          <div style={{ margin: 10 }}>
            <Typography variant="h6" gutterBottom component="div">
              Pedido pronto para envio?
            </Typography>
            <ButtonGroup>
              <Button
                variant="contained"
                color="success"
                onClick={handleSendOrder}
              >
                <CheckIcon />
                Sim, pedido pronto!
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleRejectOrder}
              >
                <ClearIcon />
                Não, rejeitar pedido!
              </Button>
            </ButtonGroup>
          </div>
        </Box>
      </Collapse>
    );
  };

  return (
    <Container>
      <h1>Pedidos</h1>

      {pedidos.length === 0 ? (
        <p>Nenhum pedido cadastrado</p>
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

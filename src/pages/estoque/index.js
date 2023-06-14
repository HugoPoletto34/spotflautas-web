import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CustomTable from "../../components/Table/Table";
import { Autocomplete, Button } from "@mui/material";
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

export const GerenciaEstoque = () => {
  const [estoque, setEstoque] = useState([]);

  const [create_quantidade, setCreateQuantidade] = useState("");
  const [create_preco_venda, setCreatePrecoVenda] = useState(0);
  const [create_preco_aluguel, setCreatePrecoAluguel] = useState(0);
  const [create_nome, setCreateNome] = useState("");
  const [create_imgUrl, setCreateImgUrl] = useState("");
  const [create_tipo, setCreateTipo] = useState("");
  const [create_open, setCreateOpen] = useState(false);
  const tipos = ["VENDA", "ALUGUEL", "VENDA_ALUGUEL"];

  const columns = [
    {
      field: "produto.nome",
      headerName: "Produto",
      align: "left",
      type: "string",
    },
    {
      field: "quantidade",
      headerName: "Quantidade",
      align: "right",
      type: "number",
    },
    { field: "tipo", headerName: "Tipo", align: "right", type: "string" },
    {
      field: "precoAluguelPorDia",
      headerName: "Preço Aluguel Por Dia",
      align: "right",
      type: "money",
    },
    {
      field: "precoVenda",
      headerName: "Preço Venda",
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
          color="error"
          onClick={deleteProduct}
        >
          Deletar
          <ClearIcon />
        </IconButton>
        <IconButton
          aria-label="expand row"
          size="small"
          color="primary"
          onClick={() => setOpen(!open)}
        >
          Editar
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </StyledTableCell>
    );
  };

  const LineCollapsable = (row, open) => {
    const [edit_quantidade, setEditQuantidade] = useState(row.quantidade);
    const [edit_preco_venda, setEditPrecoVenda] = useState(row.precoVenda);
    const [edit_preco_aluguel, setEditPrecoAluguelPorDia] = useState(
      row.precoAluguelPorDia
    );
    const [edit_nome, setEditNome] = useState(row.produto.nome);
    const [edit_tipo, setEditTipo] = useState(row.tipo);

    function editarProduto(e) {
      console.log(row)
      e.preventDefault();
      api
        .post(`/inventory/cadastrar`, {
          id: row.id,
          quantidade: edit_quantidade,
          produto: {
            productId: row.produto.id,
            nome: edit_nome,
            imgUrl: row.produto.imgUrl,
            precoVenda: edit_preco_venda,
            precoAluguelPorDia: edit_preco_aluguel,
          },

          tipo: edit_tipo,
        })
        .then((response) => {
          alert("Produto editado com sucesso!");
          window.location.reload();
        })
        .catch((error) => {
          alert("Erro ao editar produto!");
        });
      setCreateOpen(false);
    }

    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            Editar Produto
          </Typography>
          <form onSubmit={editarProduto}>
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              value={edit_nome}
              onChange={(e) => setEditNome(e.target.value)}
            />
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="Quantidade"
              variant="outlined"
              value={edit_quantidade}
              type="number"
              onChange={(e) => setEditQuantidade(e.target.value)}
            />
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="Preço"
              variant="outlined"
              value={edit_preco_venda}
              type="number"
              onChange={(e) => setEditPrecoVenda(e.target.value)}
            />
            <Autocomplete
              value={edit_tipo}
              onChange={(event, newValue) => {
                setEditTipo(newValue);
              }}
              id="controllable-states-demo"
              options={tipos}
              renderInput={(params) => (
                <TextField sx={{ margin: 0.5 }} {...params} label="Tipo" />
              )}
            />
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="Preço de aluguel por dia"
              variant="outlined"
              value={edit_preco_aluguel}
              type="number"
              onChange={(e) => setEditPrecoAluguelPorDia(e.target.value)}
            />
            <Button type="submit">Enviar</Button>
          </form>
        </Box>
      </Collapse>
    );
  };

  async function fetchEstoque() {
    const response = await api.get("/inventory");
    setEstoque(response.data);
  }

  function onSubmit(e) {
    e.preventDefault();
    api
      .post(`/inventory/cadastrar`, {
        quantidade: create_quantidade,
        produto: {
          nome: create_nome,
          imgUrl: create_imgUrl,
          precoVenda: create_preco_venda,
          precoAluguelPorDia: create_preco_aluguel,
        },
        tipo: create_tipo,
      })
      .then((response) => {
        alert("Produto criado com sucesso!");
        window.location.reload();
      })
      .catch((error) => {
        alert("Erro ao criar produto!");
      });
    setCreateOpen(false);
  }

  function deleteProduct(row) {
    var confirmed = window.confirm(
      "Tem certeza que deseja deletar este produto?"
    );
    if (confirmed)
      api
        .delete(`/inventory/${row.id}`)
        .then((response) => {
          alert("Produto deletado com sucesso!");
          window.location.reload();
        })
        .catch((error) => {
          alert("Erro ao deletar produto!");
        });
    else return;
  }

  useEffect(() => {
    fetchEstoque();
  }, []);

  return (
    <Container>
      <h1>Estoque</h1>
      <Button
        variant="contained"
        color="success"
        onClick={() => setCreateOpen(!create_open)}
      >
        Adicionar Produto
      </Button>
      <Collapse in={create_open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <form onSubmit={onSubmit}>
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="URL da imagem"
              variant="outlined"
              value={create_imgUrl}
              onChange={(e) => setCreateImgUrl(e.target.value)}
            />
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              value={create_nome}
              onChange={(e) => setCreateNome(e.target.value)}
            />
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="Quantidade"
              variant="outlined"
              type="number"
              value={create_quantidade}
              onChange={(e) => setCreateQuantidade(e.target.value)}
            />
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="Preço de Venda"
              variant="outlined"
              value={create_preco_venda}
              type="number"
              onChange={(e) => setCreatePrecoVenda(e.target.value)}
            />
            <Autocomplete
              value={create_tipo}
              onChange={(event, newValue) => {
                setCreateTipo(newValue);
              }}
              id="controllable-states-demo"
              options={tipos}
              renderInput={(params) => (
                <TextField sx={{ margin: 0.5 }} {...params} label="Tipo" />
              )}
            />
            <TextField
              sx={{ margin: 0.5 }}
              id="outlined-basic"
              label="Preço de aluguel por dia"
              variant="outlined"
              value={create_preco_aluguel}
              type="number"
              onChange={(e) => setCreatePrecoAluguel(e.target.value)}
            />
            <Button type="submit">Enviar</Button>
          </form>
        </Box>
      </Collapse>
      {estoque.length === 0 ? (
        <p>Nenhum produto cadastrado</p>
      ) : (
        <CustomTable
          columns={columns}
          rows={estoque}
          acoes={acoes}
          lineCollapsable={LineCollapsable}
        />
      )}
    </Container>
  );
};

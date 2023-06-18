import { React, useState } from "react";
import { Product, ProductImg, ProductInfo, ProductsContainer } from "./styles";
import Button from "@mui/material/Button";
import api from "../../services/api";
import { getId } from "../../services/auth";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ButtonGroup, Divider, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
const steps = [
  "Carrinho de compras",
  "Endereço do cliente",
  "Finalizar compra",
];

export const Carrinho = ({ setCarrinho }) => {
  const carrinho = JSON.parse(localStorage.getItem("CARRINHO") || "[]");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  // var dataAtual = new Date();
  // dataAtual.setDate(dataAtual.getDate());

  // var ano = dataAtual.getFullYear();
  // var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2); // O mês é baseado em zero, então é necessário adicionar +1
  // var dia = ("0" + dataAtual.getDate()).slice(-2);

  // var dataFormatada = ano + "-" + mes + "-" + dia;

  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  // const isAluguel = () => {
  //   return carrinho.some((item) => item.operacao === "alugar");
  // }
  // const [dataDevolucao, setDataDevolucao] = useState(isAluguel() ? dataFormatada : null);

  const handleNext = () => {
    if (activeStep === 0) {
      if (carrinho.length === 0) {
        alert("Adicione produtos ao carrinho");
      } else {
        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    } else if (activeStep === 1) {
      if (
        rua === "" ||
        numero === "" ||
        complemento === "" ||
        bairro === "" ||
        cidade === "" ||
        estado === "" ||
        cep === ""
      ) {
        alert("Preencha todos os campos");
      } else {
        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    } else if (activeStep === 2) {
      finalizarCompra();
    } else {
      let newSkipped = skipped;
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function aumentarQuantidade(id) {
    const index = carrinho.findIndex((item) => item.productId === id);
    carrinho[index].quantidade++;
    var dataAtual = new Date(carrinho[index].dataDevolucao);
    dataAtual.setDate(dataAtual.getDate() + 1);
    carrinho[index].dataDevolucao = dataAtual.toISOString().split("T")[0];
    localStorage.setItem("CARRINHO", JSON.stringify(carrinho));
    setCarrinho(carrinho);
  }

  function diminuirQuantidade(id) {
    const index = carrinho.findIndex((item) => item.productId === id);
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade--;
      var dataAtual = new Date(carrinho[index].dataDevolucao);
      dataAtual.setDate(dataAtual.getDate() - 1);
      carrinho[index].dataDevolucao = dataAtual.toISOString().split("T")[0];
      localStorage.setItem("CARRINHO", JSON.stringify(carrinho));
      setCarrinho(carrinho);
    }
  }

  function excluirItem(id) {
    const index = carrinho.findIndex((item) => item.productId === id);
    carrinho.splice(index, 1);
    localStorage.setItem("CARRINHO", JSON.stringify(carrinho));
    setCarrinho(carrinho);
  }

  async function finalizarCompra() {
    api
      .post("/order", {
        userId: getId(),
        produtos: carrinho,
        endereco: {
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          cep,
        },
      })
      .then((response) => {
        localStorage.removeItem("CARRINHO");
        alert(response.data);
      })
      .catch((error) => {
        alert("Ocorreu um erro: " + error);
      });
  }

  function handleQuantidade(id, qtd) {
    const index = carrinho.findIndex((item) => item.productId === id);
    // var dataAtual = new Date(dataDevolucao);
    // dataAtual.setDate(dataAtual.getDate() + qtd + 1);
  
    // var ano = dataAtual.getFullYear();
    // var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2); // O mês é baseado em zero, então é necessário adicionar +1
    // var dia = ("0" + dataAtual.getDate()).slice(-2);

    // var dataFormatada = ano + "-" + mes + "-" + dia;

    // setDataDevolucao(dataFormatada);
    return carrinho[index].quantidade;
  }

  function totalPedido() {
    return carrinho.reduce((acc, curr) => {
      if (curr.operacao === "comprar")
        return acc + curr.precoVenda * curr.quantidade;
      else if (curr.operacao === "alugar") 
        return acc + curr.precoAluguelPorDia * curr.quantidade;
      else
        return 0.0;
    }, 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return (
    <>
      <Box sx={{ width: "90%", margin: "50px auto" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {activeStep === 0 && (
            <>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                textAlign={"center"}
                margin={"30px auto"}
                width={"20%"}
              >
                Total do pedido
                <Divider />
                {totalPedido()}
              </Typography>
              <ProductsContainer>
                {carrinho.map((product) => {
                  return (
                    <Card>
                      <div style={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          src={product.imgUrl}
                          alt={product.nome}
                          height={200}
                          width={200}
                        />
                        <IconButton
                          style={{ position: "absolute", top: 0, right: 0 }}
                          color="error"
                          onClick={() => excluirItem(product.productId)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </div>
                      {product.operacao === "comprar" && (
                        <>
                          <CardContent>
                            <p>{product.nome}</p>
                            <p>
                              {product.precoVenda.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          </CardContent>
                          <CardActions>
                            <Button
                              variant="contained"
                              onClick={() =>
                                diminuirQuantidade(product.productId)
                              }
                            >
                              <RemoveIcon />
                            </Button>
                            <div style={{ margin: "auto" }}>
                              {handleQuantidade(product.productId)}
                            </div>
                            <Button
                              variant="contained"
                              onClick={() =>
                                aumentarQuantidade(product.productId)
                              }
                            >
                              <AddIcon />
                            </Button>
                          </CardActions>
                        </>
                      )}
                      {product.operacao === "alugar" && (
                        <>
                          <CardContent>
                            <p>{product.nome}</p>
                            <p>
                              {product.precoAluguelPorDia.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })} por dia
                            </p>
                          </CardContent>
                          <CardActions>
                            <div>
                              <p style={{ textAlign: "center" }}>Quantidade de dias:</p>
                              <div style={{ display: 'flex', flexDirection: 'row',  }}>
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    diminuirQuantidade(product.productId)
                                  }
                                >
                                  <RemoveIcon />
                                </Button>
                                <div style={{ margin: "auto" }}>
                                  {product.quantidade}
                                </div>
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    aumentarQuantidade(product.productId)
                                  }
                                >
                                  <AddIcon />
                                </Button>
                              </div>
                              <div style={{ textAlign: "center" }}>
                                Data de devolução:
                                <TextField
                                  id="date"
                                  type="date"
                                  value={product.dataDevolucao}

                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                </div>


                            </div>

                          </CardActions>
                        </>
                      )}
                    </Card>
                  );
                })}
              </ProductsContainer>
            </>
          )}
          {activeStep === 1 && (
            <>
              {/* Endereço do cliente */}
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                textAlign={"center"}
                margin={"50px auto"}
                width={"50%"}
              >
                Informe o Endereço do cliente
                <Divider />
              </Typography>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  margin: "0 auto",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <TextField
                  style={{ margin: 10 }}
                  label="CEP"
                  variant="outlined"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  label="Rua"
                  variant="outlined"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  label="Número"
                  variant="outlined"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  label="Complemento"
                  variant="outlined"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  label="Bairro"
                  variant="outlined"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  label="Cidade"
                  variant="outlined"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  label="Estado"
                  variant="outlined"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </div>
            </>
          )}
          {activeStep === 2 && (
            <>
              {/* Finalizar compra: visualização das informações antes de finalizar */}
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                textAlign={"center"}
                margin={"20px auto 30px auto"}
                width={"50%"}
              >
                Finalizar compra
                <Divider />
              </Typography>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  textAlign={"center"}
                  margin={"0 auto"}
                  width={"50%"}
                >
                  Carrinho:
                </Typography>
                <div style={{ width: "70%", margin: "0 auto" }}>
                  <ProductsContainer>
                    {carrinho.map((product) => {
                      return (
                        <Card>
                          <div style={{ position: "relative" }}>
                            <CardMedia
                              component="img"
                              src={product.imgUrl}
                              alt={product.nome}
                              height={200}
                              width={200}
                            />
                          </div>
                      {product.operacao === "comprar" && (
                        <>
                          <CardContent>
                            <p>{product.nome}</p>
                            <p>
                              {product.precoVenda.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          </CardContent>
                        </>
                      )}
                      {product.operacao === "alugar" && (
                        <>
                          <CardContent>
                            <p>{product.nome}</p>
                            <p>
                              {product.precoAluguelPorDia.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })} por dia
                            </p>
                          </CardContent>

                        </>
                      )}
                          <CardActions>
                            <p style={{ margin: "auto", fontSize: "1.3rem" }}>
                              x{product.quantidade}
                            </p>
                          </CardActions>
                        </Card>
                      );
                    })}
                  </ProductsContainer>
                  <Typography variant="h5" gutterBottom component="div">
                    Total do pedido:
                    {" " +
                      totalPedido()}
                  </Typography>
                </div>

                {/* mostrar o endereço */}
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  textAlign={"center"}
                  margin={"30px auto 0 auto"}
                  width={"50%"}
                >
                  Endereço do cliente:
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  component="div"
                  textAlign={"center"}
                  margin={"0 auto"}
                  width={"50%"}
                >
                  {rua}, {numero}, {complemento}, {bairro}, {cidade}, {estado},{" "}
                  {cep}
                </Typography>
                {/* mostrar os itens do carrinho */}
              </div>
            </>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="contained"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
            </Button>
          </Box>
        </div>
      </Box>
    </>
  );
};

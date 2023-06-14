import React, { useEffect, useState } from "react";
import { Product, ProductImg, ProductInfo, ProductsContainer } from "./styles";
import { Button, ButtonGroup } from "@mui/material";
import api from "../../services/api";

const Catalog = ({ setCarrinho }) => {
  const [products, setProducts] = useState([]);

  const fetchDatas = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  function adicionarCarrinhoCompras(productAdded, tipo) {
    const carrinho = localStorage.getItem("CARRINHO");
    const carrinhoAtual = JSON.parse(carrinho || "[]");
    const produtoEncontrado = carrinhoAtual.find(
      (produto) => produto.productId === productAdded.productId
    );
    if (produtoEncontrado) {
      produtoEncontrado.quantidade++;
    } else {
      if (tipo === "comprar") {
        carrinhoAtual.push({ ...productAdded, quantidade: 1, operacao: tipo, dataDevolucao: null });
      } else if (tipo === "alugar") {
        carrinhoAtual.push({
          ...productAdded,
          quantidade: 1,
          operacao: tipo,
          dataDevolucao: getDataDevolucao(1),
        });
      }
    }

    localStorage.setItem("CARRINHO", JSON.stringify(carrinhoAtual));
    setCarrinho(carrinhoAtual);
  }

  useEffect(() => {
    fetchDatas();
  }, []);

  function getDataDevolucao (qtd) {
    // new Date().toISOString().split("T")[0]
    var dataAtual = new Date();
    dataAtual.setDate(dataAtual.getDate() + qtd);
    return dataAtual.toISOString().split("T")[0];
  }

  return (
    <>
      <main>
        <ProductsContainer>
          {products.map((product) => {
            return (
              <Product key={product.productId}>
                <div style={{ margin: "0 auto" }}>
                  <ProductImg
                    src={product.imgUrl}
                    alt={product.nome}
                    width={200}
                    height={200}
                  />
                </div>
                <ProductInfo>
                  <p>{product.nome}</p>
                  {(product.tipo === "VENDA" || product.tipo === "VENDA_ALUGUEL") && (
                    <p>
                      Venda:{" "}
                      {product.precoVenda.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  )}
                  {(product.tipo === "ALUGUEL" || product.tipo === "VENDA_ALUGUEL") && (
                    <p>
                      Aluguel por dia:{" "}
                      {product.precoAluguelPorDia.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  )}
                  <ButtonGroup style={{ margin: "0 auto" }}>
                    {(product.tipo === "VENDA" || product.tipo === "VENDA_ALUGUEL") && (
                      <Button
                        color="warning"
                        size="large"
                        variant="contained"
                        onClick={() =>
                          adicionarCarrinhoCompras(product, "comprar")
                        }
                      >
                        Comprar
                      </Button>
                    )}
                    {(product.tipo === "ALUGUEL" || product.tipo === "VENDA_ALUGUEL") && (
                      <Button
                        color="info"
                        size="large"
                        variant="contained"
                        onClick={() =>
                          adicionarCarrinhoCompras(product, "alugar")
                        }
                      >
                        Alugar
                      </Button>
                    )}
                  </ButtonGroup>
                </ProductInfo>
              </Product>
            );
          })}
        </ProductsContainer>
      </main>
    </>
  );
};

export default Catalog;

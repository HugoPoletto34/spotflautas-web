import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Menu from "./components/Menu/menu";
import Routing from "./routes/routes";
import Auth from "./pages/auth/Auth";
import Register from "./pages/register/Register";
import { Typography } from "@mui/material";
import './App.css'

function App() {
  const [carrinho, setCarrinho] = useState(
    JSON.parse(localStorage.getItem("CARRINHO") || "[]")
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }
  , []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <>
      <Menu carrinho={carrinho} user={user} />
      <Auth showGoRegister={false} />
      <p className="title">
        Ou
      </p>
      <Register showGoLogin={false} />
    </>;
  }

  return (
    <>
      <Menu carrinho={carrinho} user={user} />
      <Routing
        setCarrinho={setCarrinho}
      />
    </>
  );
    

}

export default App;

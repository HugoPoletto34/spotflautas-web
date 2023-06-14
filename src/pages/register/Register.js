import React, { useState } from "react";
import { FormContainer, FormTitle, Form } from "../../styles/form";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";
import api from "../../services/api";
import "../../FirebaseConfiguration";
import { signInWithCustomToken, getAuth  } from "firebase/auth";
import { login } from "../../services/auth";

const Register = ({ showGoLogin }) => {
  let [user, setUser] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const createAcc = async (e) => {
    e.preventDefault();
    delete user.confirmarSenha;
    user = {
      email: user.email,
      password: user.senha,
      username: user.nome + " " + user.sobrenome,
    }
    const userResponse = await api.post("/cadastro", user);
    const { token } = userResponse.data;
    const { idToken } = userResponse.data;
    const auth = getAuth();

    signInWithCustomToken(auth, token)
      .then((userCredential) => {
        // Signed in
        login(token, idToken);
        setUser(userCredential.user);
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
  };

  return (
    <>
      <main>
        <section>
          <FormContainer>
            <FormTitle>Criar sua conta</FormTitle>
            <Form>
              <Input
                id="nome"
                name="nome"
                type="text"
                required
                placeholder="Nome"
                func={(e) => setUser({ ...user, nome: e.target.value })}
              />
              <Input
                id="sobrenome"
                name="sobrenome"
                type="text"
                required
                placeholder="Sobrenome"
                func={(e) => setUser({ ...user, sobrenome: e.target.value })}
              />
              <Input
                name="email"
                type="email"
                required
                placeholder="Email"
                func={(e) => setUser({ ...user, email: e.target.value })}
              />

              <Input
                name="senha"
                type="password"
                required
                placeholder="Senha"
                func={(e) => setUser({ ...user, senha: e.target.value })}
                alert={"Sua senha deve conter mais que 8 caracteres"}
              />

              <Input
                name="confirmar-senha"
                type="password"
                required
                placeholder="Confirmar Senha"
                func={(e) =>
                  setUser({ ...user, confirmarSenha: e.target.value })
                }
              />
              {showGoLogin ?? <a href="/login">Já possui uma conta? Entre!</a>}

              <Button color="primary" func={createAcc} text="Login" />
            </Form>
          </FormContainer>
        </section>
      </main>
    </>
  );
};

export default Register;

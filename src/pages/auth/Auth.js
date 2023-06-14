import React, { useState } from "react";
import "../../FirebaseConfiguration";
import { signInWithCustomToken, getAuth  } from "firebase/auth";
import api from "../../services/api";
import { login } from "../../services/auth";
import { FormContainer, FormTitle, Form } from "../../styles/form";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";


const Auth = ({ showGoRegister }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    api.post("/login", { email, password })
      .then((response) => {
      const { token } = response.data;
      const { idToken } = response.data;
      const auth = getAuth();

      signInWithCustomToken(auth, token)
        .then((userCredential) => {
          // Signed in
          login(token, idToken);
          window.location.href = "/";

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + ': ' + errorMessage);
        });
      })
      .catch((error) => {
        const er = JSON.parse(error.request.response);
        const errorMessage = er.message;
        alert(errorMessage);
      }
    );
  };


  return (
    <>
      <main>
        <section>
          <FormContainer>
            <FormTitle>Entrar na sua conta</FormTitle>
            <Form>
              <Input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                func={(e) => setEmail(e.target.value)}
              />

              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                func={(e) => setPassword(e.target.value)}
              />

              {showGoRegister ?? <a href="/register">Não tem uma conta? Cadastre-se</a>}

              <Button color="primary" func={onLogin} text="Login" />
            </Form>
          </FormContainer>
        </section>

      </main>
    </>
  );
};

export default Auth;

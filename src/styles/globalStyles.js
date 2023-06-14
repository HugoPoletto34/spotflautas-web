import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
  --primary: #00CFDC;
  --primary-dark: #00676D;
  --primary-light: #00000;
  --secondary: #F28A41;
  --secondary-dark: #00000;
  --secondary-light: #00000;
  --text: #252D2E;
  --ipt-text: #003D4148;
  --background: #F1F1F1;
  --ipt-background: #FFFFFF;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body, button, input, textarea {
  margin: 0;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
button {
  background: transparent;
  border: none;
}
`;

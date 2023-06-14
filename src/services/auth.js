import jwt_decode from "jwt-decode";

export const ID_TOKEN_KEY = "@sf-idToken";
export const TOKEN_KEY = "@sf-token";
export const isAuthenticated = () => {
  const token = localStorage.getItem(ID_TOKEN_KEY);
  if (!token) {
    return false;
  }
  let result = false;
  try {
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();
  
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 > currentDate.getTime()) {
      result = true;
    }
  } catch (error) {
    console.log("Invalid token");
  }
  


  return result;
};
export const getUserName = () => {
  const token = localStorage.getItem(ID_TOKEN_KEY);
  if (!token) {
    return "";
  }
  let result = "";
  try {
    let decodedToken = jwt_decode(token);
    result = decodedToken.nome;
  } catch (error) {
    console.log("Invalid token");
  }
  return result;
};

export const getId = () => {
  const token = localStorage.getItem(ID_TOKEN_KEY);
  if (!token) {
    return "";
  }
  let result = "";
  try {
    let decodedToken = jwt_decode(token);
    result = decodedToken.user_id;
  } catch (error) {
    console.log("Invalid token");
  }
  return result;
};

export const getRole = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return "";
  }
  let result = "";
  try {
    let decodedToken = jwt_decode(token);
    result = decodedToken.claims.role;
  } catch (error) {
    console.log("Invalid token");
  }
  return result;
};

export const getToken = () => localStorage.getItem(ID_TOKEN_KEY);
export const login = (token, idToken) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ID_TOKEN_KEY, idToken);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
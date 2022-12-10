import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const Home = () => {
  return axios.post(API_URL + "login", {

  });
};

const register = (name,username, email, password,c_password) => {
  return axios.post(API_URL + "register", {
    name,
    username,
    email,
    password,
    c_password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "register", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
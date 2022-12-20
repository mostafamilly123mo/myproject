import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { toast } from 'react-toastify';
import {  NavLink } from "react-router-dom";
import { authService } from "../services/auth.service";
import { useCookies } from "react-cookie";
import { TOKEN_KEY } from "./utils/base-api/constants";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [_, setCookies] = useCookies();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      const newUser = form.current.getValues();

      authService.login({
        login: newUser.username,
        password: newUser.password
      })?.then((res => {
        if(!res.status)
          toast.error(res?.msg);
        else{
          toast.success(res.msg);
          setCookies(TOKEN_KEY, res.user.token);
        }
      })); 
    }
  };

    return(
      <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
             
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading} >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton ref={checkBtn} />
           <div className="form-m">      
                 Don't Have Account ?    
           <NavLink to="Register">
            <span >  .... Register </span>
          </NavLink>
          </div> 
        </Form>
      </div>
    </div>
  );
};

export default Login;

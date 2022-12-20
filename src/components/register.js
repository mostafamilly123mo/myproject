import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { authService } from "../services/auth.service";
const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">This is not a valid email.</div>
    );
  }
};

const vname = (value) => {
  if (value.length < 3 || value.length > 10) {
    return (
      <div className="invalid-feedback d-block">
        The name must be between 3 and 10 characters.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 8 and 20 characters.
      </div>
    );
  }
};
const vc_password = (value) => {
  if (value.length < 8 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 8 and 20 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChangename = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangec_Password = (e) => {
    const c_password = e.target.value;
    setC_password(c_password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      const newUser = form.current.getValues();
      authService
        .register({
          name: newUser.name,
          email: newUser.email,
          user_name: newUser.username,
          password: newUser.password,
          c_password: newUser.c_password,
          gender: "m",
        })
        ?.then((res) => {
          if (!res.status)
            toast.error(res?.msg[Object.keys(res.msg)?.[0]]?.[0]);
          else {
            toast.success(res.msg);
            navigate("/data");
          }
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangename}
                  validations={[required, vname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
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
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="c_password"
                  value={c_password}
                  onChange={onChangec_Password}
                  validations={[required, vc_password]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;

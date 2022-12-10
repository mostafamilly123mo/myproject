import React, { useState, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import UserService from "../services/user.service";

const Home = () => {
    // const form = useRef();
    // const checkBtn = useRef();
  
  
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }

      
    );
  }, []);

  return (
    <div className="container">
         <header className="jumbotron">
          <h3> Home page</h3>
         </header>
         <img
          src=""
          alt="profile-img"
          className="img-card" 
          
        />
           <div className="form-group">
               <button className="btn btn-primary btn-block" disabled={loading} >
                 {loading && (
                 <span className="spinner-border spinner-border-sm"></span>
                 )}
                 <span> Do You Have Login   </span>
                 <NavLink to="login">
                  <span > .....login  </span>
                 </NavLink>
                </button>
           </div>

            


     
    </div>
  );
};

export default Home;
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [username, setUsername]= useState("");
const [password, setPassword]= useState("");
const [error, setError]= useState(false);

const navigate=useNavigate();

const login=()=>{
  fetch("http://localhost:5002/admin/login", {
    method:"post",
    headers:{
     'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "username":username,
      "password": password
    })
  }).then(e=>e.json()).then(e=>{console.log(e.token); localStorage.setItem("token", e.token); navigate("/")}).catch(e=>setError(true));
}

  return (
   <>
   <h1> Welcome to Login Page</h1>
   <div style={{display:"flex", flexDirection: "column"}}>
   <label>Username</label>
   <input onChange={(e)=>{setUsername(e.target.value)}} />
   <label>Password</label>
   <input onChange={(e)=>{setPassword(e.target.value)}} />
   <button onClick={login}>Login Here</button>
   </div>
   {

    error && "This username and password is invalid..!! login in again "
   }
   </>
  )
}

export default Login
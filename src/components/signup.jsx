import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/signup.css"
function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);
    // console.log(cPassword);

    if(!email.includes("@"))
    {
        alert("Please enter valid email id")
        return
    }
    let pWord = password
    let cpWord = cPassword
    if(pWord!==cpWord){
        alert("Password doesn't match")
        return
    }

    const res = await axios.post("https://booklist-b8gz.onrender.com/signup", {email:email, password:password})
    console.log(res);

    if(res.data.status === "failed")
    {
        alert("User already exists")
        return
    }
    alert("Registration Successfull")
    navigate("/")
  };
  return (
    <div>
      <div className="container">
        <h1>Register</h1>
        <form id="form">
          <div className="input-field">
            <input id='input-box' type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
          </div>
          <div className="input-field">
            <input id='input-box' type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
          </div>
          <div className="input-field">
            <input id='input-box' type="password" placeholder="Confirm Password" onChange={(e)=>{setCPassword(e.target.value)}} value={cPassword}/>
          </div>
          <div className="input-field">
            <button className="btn" onClick={handleRegister}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

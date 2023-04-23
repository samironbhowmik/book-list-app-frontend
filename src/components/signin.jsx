import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Signin() {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState("")

    const handleLogin = async(e)=>{
        e.preventDefault()
        const res = await axios.post("http://localhost:7000/signin", {email:email, password:password})
        console.log(res);

        if(res.data.status === "success")
        {
            alert("Login Successfull")
            navigate("/home")
        }
        else{
            alert("Invalid credentials, Please enter correct email and password")
        }
    }

  return (
    <div>
        <div className="container">
            <h1>Login</h1>
            <form id='form'>
                <div className="input-field">
                    <input id='input-box' type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                </div>
                <div className="input-field">
                <input id='input-box' type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                </div>
                <div className="input-field">
                    <button className='btn' onClick={handleLogin}>Login</button>
                </div>

                <p>Don't have an account?</p>
                <Link to="/signup">
                    Register Now!
                </Link>
            </form>
        </div>
    </div>
  )
}

export default Signin
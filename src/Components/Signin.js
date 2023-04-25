import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function Signin(){
    let navigate = useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
    const LoginIN = async () => {
try {
            if(!username || !password) throw 'Fields are Empty'
            const LogininUrl = 'http://cepbep.ddns.net:1500/api/users/login'
            const data = {
                "userName": username,
                "password": password
            }
            const responceLoginin = await axios.post(LogininUrl,data,{
                'content-type': 'application/json'
            })
            console.log(responceLoginin);
            
            if(responceLoginin.status==200){
                seterrorMessage('Succesfully')
                localStorage.setItem('userid', responceLoginin.data._id)
                console.log(responceLoginin.data._id);
            } 
            if(responceLoginin.status===200){
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }


} catch (error) {
    seterrorMessage(error)
}
    }

    return(
        <div className="LoginIn-box">
            <h3 className="LoginIn-box-title">Login in</h3>
            <p className="StatusOfLoginin">{errorMessage}</p>
             <input value={username} onChange={(event)=>{setusername(event.target.value)}} placeholder="Username"/> 
             <input value={password} onChange={(event)=>{setpassword(event.target.value)}} placeholder="Password"/>
            <button className="LoginIn-button" onClick={LoginIN}>Sign In</button>
            <div className="Create-an-account">
                <p>Don't Have an account?  </p>
                <Link to="/registration" >Create an account</Link>
            </div>
           
      

        </div>
    )
}

export default Signin
import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function Registration(){
    let toHome = useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [trypassword, settrypassword] = useState('')
    const [age, setage] = useState('')
    const [country, setcountry] = useState('')
    const [city, setcity] = useState('')

    const [regMessage, setRegMessage] = useState('')


    const CreateUser = async () =>{
       
        try {
            if(password!=trypassword) throw 'Passwords are not similar'
            if(!username || !password || !trypassword || !age || !country || !city) throw 'Empty fields'
            const regURL = 'http://cepbep.ddns.net:1500/api/users/addUser'
            const data = {
              userName: username,
              password: password,
              creator: 'admin',
              activeStatus: true,
              isClosedProfile: true,
              avatarURL: 'url',
              about: 'string',
              description: 'description',
              age: age,
              country: country,
              city: city,
              gender: 'male',
              arrayOfFollowers: [],
              arrayOfFollowing: [],
              arrayOfPosts: []
          }
            const responceUser = await axios.post(regURL,data,{
              'content-type': 'application/json'
            })
            if(responceUser.status==200){
              setRegMessage('Succesfully')
            }
            if(responceUser.status==200){setTimeout(() => {
                toHome('/')
                console.log(responceUser);
            }, 2000);  }
        } catch (error) { 
            setRegMessage(error)
        }

    }


    return(
        <div className="Reg-Form">
            <div className="Reg-Form-title"><h3>Registration Form Or <Link to='/'>Sign in</Link></h3></div>
             <h3 className="Reg-message">{regMessage}</h3>
             <div className="Reg-Fields">
             <label htmlFor="username">User Name</label>
             <input id="username" value={username} onChange={(event)=>{setusername(event.target.value)}}/>

             <label htmlFor="age">Age</label>
             <input id="age" value={age} onChange={(event)=>{(setage(event.target.value))}} type="email"/>

             <label htmlFor="country">Country</label>
             <input id="country" value={country} onChange={(event)=>{setcountry(event.target.value)}} />

             <label htmlFor="city">City</label>
             <input id="city" value={city} onChange={(event)=>{setcity(event.target.value)}} />

             <label htmlFor="Password">Password</label>
             <input id="password" value={password} onChange={(event)=>{setpassword(event.target.value)}}  type="password"/>

             <label htmlFor="trypassword">Try Password</label>
             <input id="trypassword" value={trypassword} onChange={(event)=>{settrypassword(event.target.value)}} type="password"/> 
            <button onClick={CreateUser}>Registration</button>
             </div>

        </div>
    )
}

export default Registration
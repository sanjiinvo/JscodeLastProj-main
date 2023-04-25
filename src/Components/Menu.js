import { React, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import './main.scss'
import logomain from '../images/logomain.png'
import GetName from "./getNameofUserbyID";
import axios from "axios";
function Menu(){
    const [user, setuser] = useState('')
    const userid = localStorage.getItem('userid')

    function NoUser () {
        console.log(`no user`);
        return(
            <Link  className="Loginin link" to='signin'> Sign in</Link>
        )
    }

    const HaveUser = async () =>{
        console.log(`haveuser`);
        const responce = await axios.get(`http://cepbep.ddns.net:1500/api/users/getUserById/${userid}`)
        setuser(responce.data)

        return(
            <div>
                true
                    {/* <li><Link  className='username' to={`/profile/${user._id}`}>{user.userName}</Link></li> */}
               
            </div>
        )
    }


    return(
        <div>
            <div className="header">
                <div className="left-bar">
                    <Link className="link" to='/'>Главная</Link>
                    <Link className="link" to='otherstores'>Магазины</Link>
                    <Link className="link" to='delivery'>Доставка</Link>
                </div>
                <div className="middle-bar">
                    <Link to='/'><img src={logomain}/></Link>
                </div>
                <div className="right-bar">
                    <Link className="link" to='/'>Москва, Ул.Рандом 31</Link>
                    {localStorage.getItem('userid')? HaveUser()  : NoUser() }
                </div>
                
            </div>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Menu
import { React, useEffect, useState, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import './main.scss'
import logomain from '../images/logomain.png'
import axios from "axios";
import { HeartFill, Basket, PersonCircle, List } from "react-bootstrap-icons";
import BotGoods from "./BottomGoods";
import MiniBasket from "./Mini-Basket";

function Menu(){
    const [user, setuser] = useState('')
    const userid = localStorage.getItem('userid')
    let mobMenu = document.querySelector('.mob-menu-main')
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

     useEffect(()=>{
        GetUser()
     },[])

     useEffect(() => {
        console.log(`useef 2`);
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            console.log(123);
            document.removeEventListener('mousedown', handleClickOutside);
          }
        };
    
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpen]);

    function NoUser () {
        console.log(`no user`);
        return(
            <Link  className="Loginin link" to='signin'> Sign in</Link>
        )
    }

    const GetUser = async ()=>{
        console.log(`haveuser`);
        const responce = await axios.get(`http://cepbep.ddns.net:1500/api/users/getUserById/${userid}`)
        setuser(responce.data)
    }
    const HaveUser = () =>{
        
        return(
            <div className="personal-icons">
                <Link to={`/product/${userid}/favorite`} className="link favor-link"><HeartFill color="red" /></Link>
                <Link  className='link privat-profile' to={`/profile/${user._id}`}><PersonCircle /> <div> {user.userName}</div></Link>
            </div>
        )
    }
    
    const ToogleMenu = () => {
        setIsOpen(true)
    // let mobMenu = document.querySelector('.mob-menu-main')
    //     mobMenu.classList.add('show-mob-menu')
    } 


    return(
        <div>
            <div className="header">
            <div className="mobile-menu">
                <List onClick={ToogleMenu} className="mob-menu-icon "/>
    <div ref={menuRef} className={isOpen? 'mob-menu-main show-mob-menu' : 'mob-menu-main'}>
                    <img className="mob-menu-logo" src={logomain}/>
                    <div className="mob-menu-list">
                        <Link className="link" to='/'>Главная</Link>
                        <Link className="link" to='otherstores'>Магазины</Link>
                        <Link className="link" to='delivery'>Доставка</Link>
                        <div className="mob-menu-personal">
                        {localStorage.getItem('userid')?  <div className="mob-menu-persnoal-icons">
                        <Link to={`/product/${userid}/favorite`} className="link">Избранное</Link>
                <Link  className='link mob-privat-profile' to={`/profile/${user._id}`}>{user.userName}</Link>
                        </div> : <div><Link  className="Loginin link" to='signin'> Sign in</Link> </div> } 
                        </div>
                    </div>
                </div>
                </div>
                <div className="left-bar">
                    <Link className="link" to='/'>Главная</Link>
                    <Link className="link" to='otherstores'>Магазины</Link>
                    <Link className="link" to='delivery'>Доставка</Link>
                    
                </div>
                <div className="middle-bar">
                    <Link to='/'><img src={logomain}/></Link>
                </div>
                <div className="right-bar">
                    <Link className="link adress" to='/'>Ул.Рандом 31</Link>
                     {localStorage.getItem('userid')? HaveUser()  : NoUser() } 
                    
                </div>
                
            </div>
            <Outlet/>
            <MiniBasket/>
            <Footer/>
            <BotGoods/>
        </div>
    )
}

export default Menu
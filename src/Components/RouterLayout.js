import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import Homepage from "./Homepage";
import Delivery from "./Delivery";
import OtherStores from "./OtherStores";
import Signin from "./Signin";
import Registration from "./Registration";
import Profile from "./Profile";


function RouterLayout() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path="delivery" element={<Delivery/>}/>
                    <Route path="otherstores" element={<OtherStores/>}/>
                    <Route path="signin" element={<Signin/>}/>
                    <Route path="registration" element={<Registration/>}/>
                    <Route path="profile/:userid" element={<Profile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterLayout
import axios from "axios"
import React, { useState } from "react"


const GetName = async (id) =>{
    const [user, setuser] = useState()
    const responce = await axios.get(`http://cepbep.ddns.net:1500/api/users/getUserById/${id}`)
    setuser(responce.data)
    console.log(id);

}

export default GetName
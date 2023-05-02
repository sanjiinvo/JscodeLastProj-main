import axios from "axios"
import getRandomNumbersMassive from "./RandomNumsInArray"
import { useState,useEffect } from "react";
import GoodsBody from "./GoodsBody";
import BotGoodsBody from "./botGoodsBody";
import MiniCart from "./Mini-Cart";
import store from "../store/store";

function BotGoods(){
    let windowW = window.innerWidth
    const [GoodsArray, setGoodsArray] = useState([])
    let randomAmoutGoods = 4
    if (windowW>620) {
        randomAmoutGoods = 3
    }



    useEffect(()=>{

        GetGoods()
        RenderGoods()
    },[])  

    const GetGoods = async () => {
        const GoodsUrl = 'https://fakestoreapi.com/products'
        const responce = await axios.get(GoodsUrl)
        if(responce.status===200){
            FillGoods(responce.data)
        }
    }
    const FillGoods = (data) => {
        const RandomIDs = getRandomNumbersMassive(0, 20, randomAmoutGoods)
        const filtered = data.filter((obj)=>RandomIDs.includes(obj.id))
        setGoodsArray(filtered)
    }

    const RenderGoods = () =>{
        return(
            <div className="BotGoods">
                {GoodsArray.length !=0 ? GoodsArray.map((item)=>(<BotGoodsBody key={item.id} item={item}/>)) : <div>Loading</div>}
            </div>
        )
    }

    return(
        <div className="BotGoods-container">
            <RenderGoods/>
        </div>
    )
}
export default BotGoods
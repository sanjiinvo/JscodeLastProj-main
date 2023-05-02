import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartFill, Heart, Basket  } from "react-bootstrap-icons";
import store from "../store/store";
import BottomGoodsRenderAction from "../store/actioncreators/BottomGoodAction";

function BotGoodsBody(props){

    let navigate = useNavigate()
    

    const ToGoodsCart = () =>{
        localStorage.setItem('goodsid', props.item.id )
        navigate(`/product/${props.item.id}`)
        store.dispatch(BottomGoodsRenderAction(props.item.id))
    }




    return(
        <div style={{order:1}} className="bot-goods-box" id={props.item.id}>
            {props.item.length != 0 &&<img className="bot-goods-main-image" src={props.item.image}/>}
            {props.item.length != 0 &&<div  className="bot-goods-title-top">{props.item.title}</div>}
      
                {props.item.length != 0 &&<div className="bot-goods-main-price">{props.item.price}$</div>}
                <button onClick={ToGoodsCart}>Show more</button>
        
            

        </div>
    )
}

export default BotGoodsBody
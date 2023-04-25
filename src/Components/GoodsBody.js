import { useState } from "react";
import { Link } from "react-router-dom";

function GoodsBody(props){
    function RateStars(rating){

        return(
            
            <div>
                {'★'.repeat(rating) + '☆'.repeat(6 - rating)}
            </div>
        )
    }
    return(
        <div style={{order:1}} className="goods-box" id={props.item.id}>
            {props.item.length != 0 &&<div className="goods-left-bar"><img className="goods-main-image" src={props.item.image}/></div>}
            <div className="goods-middle-bar">
            {props.item.length != 0 &&<div className="goods-title-top">{props.item.title}</div>}
                {props.item.length != 0 &&<div className="goods-description">{props.item.description}</div>}
                {props.item.length != 0 &&<div className="type-of-good">Category: {props.item.category}</div>}
            </div>
            <div className="goods-right-bar">

                {props.item.length != 0 &&<div className="goods-main-price">Price: {props.item.price}$</div>}
                {props.item.length != 0 &&<div className="goods-rating">{RateStars(props.item.rating.rate)}</div>}
                {props.item.length != 0 &&<div className="goods-amount">Amount: {props.item.rating.count}</div>}
                <div className="goods-buttons">
                    <button className="toBuy">Buy</button>
                    <button className="toFavor">Favorite</button>
                </div>
            </div>
            

        </div>
    )
}

export default GoodsBody
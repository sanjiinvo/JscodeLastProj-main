import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartFill, Heart, Basket  } from "react-bootstrap-icons";
import FavorActionCreater from "../store/actioncreators/FavorActionCreater";
import store from "../store/store";
import BasketgoodsAction from "../store/actioncreators/BasketGoodsAction";

function GoodsBody(props){

    const [isFavorite, setisFavorite] = useState(false)

    useEffect(()=>{
        FavoriteImage()
        let favoriteArray = JSON.parse(localStorage.getItem('FavoriteArray'))
        if(favoriteArray.includes(props.item.id)) {
            setisFavorite(true)
        }
        // store.subscribe(()=>{
        //     const state = store.getState()
        //     console.log(`state`, state, props.item.id);
        //     if(state.type == 'isFavor' && state.id == props.item.id){
        //         setisFavorite(true)
        //     }
        // })
    },[])

    let navigate = useNavigate()
    

    function FavoriteImage() {
        // isFavorite ?   (<HeartFill/>) :  (<Heart/>)
        if( isFavorite === true) return (<HeartFill/>)
        else return (<Heart/>)
        // if (FavoriteArray.includes(props.item.id)) return (<HeartFill/>)
        // else return (<Heart/>)
    }


    const AddToFavorite = (id) =>{
        let FavoriteArray = JSON.parse(localStorage.getItem('FavoriteArray'))

        FavoriteArray = FavoriteArray ? FavoriteArray : []
        if(!FavoriteArray.includes(id)){
            FavoriteArray = [...FavoriteArray, id]
            setisFavorite(true)
        } else {
            FavoriteArray = FavoriteArray.filter((productID)=>productID !=id)
            setisFavorite(false)
        }
        localStorage.setItem("FavoriteArray", JSON.stringify(FavoriteArray))

            store.dispatch(FavorActionCreater(id))
    }


    const AddToBuy = (id)=>{
        let BuyArray = JSON.parse(localStorage.getItem('BuyArray'))
        BuyArray = BuyArray ? BuyArray : []
        if(!BuyArray.includes(id)){
            BuyArray = [...BuyArray, id]
        } else {
            BuyArray = BuyArray.filter((productID)=>productID !=id)
        }
        localStorage.setItem('BuyArray', JSON.stringify(BuyArray))
        store.dispatch(BasketgoodsAction(id))
    }


    const ToGoodsCart = () =>{
        localStorage.setItem('goodsid', props.item.id )
        navigate(`/product/${props.item.id}`)
    }


    function RateStars(rating){

        return(
            <div>
                {'★'.repeat(rating) + '☆'.repeat(6 - rating)}
            </div>
        )
    }

    return(
        <div style={{order:1}} className="goods-box" id={props.item.id}>
            {props.item.length != 0 &&<div className="goods-left-bar">
                <img className="goods-main-image" src={props.item.image}/></div>}
            <div className="goods-middle-bar">
            {props.item.length != 0 &&<div onClick={ToGoodsCart} className="goods-title-top">{props.item.title}</div>}
                {props.item.length != 0 &&<div className="goods-description">{props.item.description}</div>}
                {props.item.length != 0 &&<div className="type-of-good">Category: {props.item.category}</div>}
            </div>
            <div className="goods-right-bar">

                {props.item.length != 0 &&<div className="goods-main-price"><div>Price:</div> {props.item.price}$</div>}
                {props.item.length != 0 &&<div className="goods-rating">{RateStars(props.item.rating.rate)}</div>}
                {props.item.length != 0 &&<div className="goods-amount"><div>Amount:</div> {props.item.rating.count}</div>}
                <div className="goods-body-buttons">
                    <div onClick={()=>{AddToBuy(props.item.id)}} className="toBuy"><Basket/></div>
                    <div  onClick={()=>{AddToFavorite(props.item.id)}}  className="toFavor">{<FavoriteImage/>}</div>
                </div>
            </div>
            

        </div>
    )
}

export default GoodsBody
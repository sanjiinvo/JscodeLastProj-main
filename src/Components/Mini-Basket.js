import axios from "axios"
import { useEffect, useState } from "react"
import MiniBasketBody from "./Mini-basket-body"
import store from "../store/store"
import { XCircle, Basket2Fill } from "react-bootstrap-icons";



function MiniBasket(){

    const [BasketGoods, setBasketGoods]= useState([])
    const [GoodsAmount, setGoodsAmount] = useState()
    useEffect(()=>{
        store.subscribe(()=>{
            getAllGoods()
            CurrenGoodsAmount()
        })
        getAllGoods()
    },[])

    const CurrenGoodsAmount = () => {
        let totalPrice = 0
        if (GoodsAmount !=0) {
            for(let i in BasketGoods){
                totalPrice = totalPrice + BasketGoods[i].price
            }
        }
        if (GoodsAmount == 0) return
        if (GoodsAmount != 0) return (<div style={{display:'flex', flexDirection:'column'}}> <div> В корзине: {GoodsAmount}</div><div>Цена: {totalPrice}$</div> </div>)
    }

    const getAllGoods = async () => {
        const goodsURL = `https://fakestoreapi.com/products`
        const responce = await axios.get(goodsURL) 
        FillGoods(responce.data) 

    }

    const FillGoods = (data) => {
        const IDsFromLS = localStorage.getItem('BuyArray')
        const filtered = data.filter((obj)=>IDsFromLS.includes(obj.id))
        setBasketGoods(filtered)
        setGoodsAmount(filtered.length)
    }

    const RenderGoods = () =>{
        return(
           BasketGoods.length !=0 ? <>{BasketGoods.map((item)=><MiniBasketBody key={item.id} item={item}/>)} </> : <div className="empty-basket">Empty</div>
        )
    }

    const OpenHideBasket = () => {
        let basket = document.querySelector('.mini-basket')
        basket.classList.toggle('hidden')
        let basketicon = document.querySelector('.mini-basket-icon')
        basketicon.classList.toggle('hidden')
    }


    return(
        <div>
            <div className="mini-basket-icon" onClick={OpenHideBasket}><Basket2Fill/></div>
            <div className="mini-basket hidden">
            <CurrenGoodsAmount/>
            <RenderGoods/>
            <div onClick={OpenHideBasket} className="close-basket"><XCircle/></div>
        </div>
        </div>

    )
}

export default MiniBasket
import { Trash } from "react-bootstrap-icons";
import store from "../store/store";
import BasketgoodsAction from "../store/actioncreators/BasketGoodsAction";



function MiniBasketBody(props){


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


    return(
        <div className="mini-basket-goods-body">
            
            <div className="mini-basket-image-box">
                <img className="mini-basket-image" src={props.item.image}/>
            </div>
            <div className="mini-basket-rightbat">
                <div className="mini-basket-tittle">
                    {props.item.title}
                </div>
                <div className="mini-basket-price">
                 {props.item.price}$ <div onClick={()=>{AddToBuy(props.item.id)}} className="mini-basket-delete">{<Trash/>}</div>
                </div>                
                


            </div>


        </div>
    )
}
export default MiniBasketBody
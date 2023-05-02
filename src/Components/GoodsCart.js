import axios from "axios"
import { useEffect, useState } from "react"
import { HeartFill, Heart } from "react-bootstrap-icons";
import store from "../store/store";
import FavorActionCreater from "../store/actioncreators/FavorActionCreater";


function GoodsCart (){

    const [Goodsinfo, setGoodsinfo] = useState({})
    const goodsID = localStorage.getItem('goodsid')
    const [isFavorite, setisFavorite] = useState(false)


    useEffect(()=>{ 
        store.subscribe(()=>{
            GetGoodsInfo()
        })
        GetGoodsInfo()
        FavoriteImage()
        let favoriteArray = JSON.parse(localStorage.getItem('FavoriteArray'))
        if(favoriteArray.includes(Goodsinfo.id)) {
            setisFavorite(true)
        }
    },[])
    const GetGoodsInfo = async () => {
        const goodsURL = `https://fakestoreapi.com/products/${localStorage.getItem('goodsid')}`
        const responce = await axios.get (goodsURL)
        FillGoods(responce.data )

    }
    const FillGoods = (data) =>{
        let filtered = data
        if(data.length!=0){
         filtered = data
        }
        setGoodsinfo(filtered)
    }
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
        const BuyArray = JSON.parse(localStorage.getItem('BuyArray'))
        BuyArray.push(id)
        localStorage.setItem('BuyArray', JSON.stringify(BuyArray))
    }
 

    function RateStars(rating){

        return(
            <div>
                {'★'.repeat(rating) + '☆'.repeat(6 - rating)}
            </div>
        )
    }

    return( 
        <div> 
        {(typeof Goodsinfo === 'undefined' || Object.keys(Goodsinfo).length === 0)? <div>empty</div> : <div className="Goods-cart-container">{Goodsinfo.descriptio}

            <div className="goods-cart-left">
              
                    <img className="goods-cart-image" src={Goodsinfo.image}/>
                    
                <div className="goods-cart-price">Price: {Goodsinfo.price}$</div>


            </div>
            <div className="goods-cart-right">
                    <div className="goods-cart-title">{Goodsinfo.title}</div>
                    <div className="goods-cart-category">Category: {Goodsinfo.category}</div>
                    <div style={{opacity:'0.5'}}>Код товара: {Goodsinfo.id} ID</div>
                    <div className="goods-cart-rate"> <div onClick={()=>{AddToFavorite(Goodsinfo.id)}}  className="Favor-icon"><FavoriteImage/></div> {RateStars(Goodsinfo.rating.rate)}</div>
                    
                    <div className="goods-cart-decription">{Goodsinfo.description}</div>
                 

                    <div className="">Amount: {Goodsinfo.rating.count}</div>
                            <button onClick={()=>{AddToBuy(Goodsinfo.id)}} className="toBuy">Buy</button>
                            
                   

            </div>


        
        </div>}

        </div>

    )


}

export default GoodsCart
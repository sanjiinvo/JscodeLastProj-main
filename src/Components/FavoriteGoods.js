import axios from "axios";
import GoodsBody from "./GoodsBody"
import { useState, useEffect } from "react";


function FavoriteGoods(){
    const [FavorGoods, setFavorGoods] = useState([])
    
    useEffect(()=>{
        console.log(`Array from LS:`, JSON.parse(localStorage.getItem("FavoriteArray")));
        // setFavorIDS(JSON.parse(localStorage.getItem("FavoriteArray")))
    getAllGoods()
    },[])
 
    useEffect(()=>{
        RenderGoods()
    },[FavorGoods])
    
    const getAllGoods = async () => {
        const goodsURL = `https://fakestoreapi.com/products`
        const responce = await axios.get(goodsURL) 
        if(responce.status === 200){
            console.log(`responce coming`, responce.data);
            FillGoods(responce.data) 
    }  
       
    }   
    
    const FillGoods = (data) => {
        const IDsFromLS = localStorage.getItem('FavoriteArray')
        const filtered = data.filter((obj)=>IDsFromLS.includes(obj.id))
        console.log(`Filtered:`, filtered);
        setFavorGoods(filtered)
    }


    const RenderGoods = () => {
        return (
          <div className="Favorite-Goods">
            {FavorGoods.length  !=0 ?  FavorGoods.map((item) => (<GoodsBody key={item.id} item={item} />)) : <div className="Empty-Favor">Empty</div>}
            {/* {FavoriteIDs.map((id)=><GoodsBody key={id} id={id}/>)} */}
          </div>
        );
      };

    return(
            <> {RenderGoods()}</>
    )
  
}

export default FavoriteGoods
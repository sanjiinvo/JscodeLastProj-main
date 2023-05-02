import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MainCarousel from "./MainCarousel";
import getRandomNumber from "./Randomnum";
import GoodsBody from "./GoodsBody";

function Homepage(){   

    const [allGoodsArray, setAllGoodsArray] = useState([])
    const [type, settype] = useState(``)
    const [randomProductID, setRandomProducID] = useState(0)
    const [MaxElements, setMaxElements] = useState(5)
    const [defaultfilter, setdefaultfilter] = useState(true)
    
    

    
    useEffect(()=>{
        getGoods()
    },[type, defaultfilter])
    useEffect(()=>{
        RenderGoods()
    },[allGoodsArray])


    const getGoods = async ()=>{
        const goodsURL = !type? `https://fakestoreapi.com/products` : `https://fakestoreapi.com/products/category/${type}`

        const responce = await axios.get(goodsURL) 
        if(responce.status === 200){
        setAllGoodsArray(responce.data) 
        let randomproduct = getRandomNumber(0, responce.data.length)
        
        while(!responce.data[randomproduct].price){
                randomproduct = getRandomNumber(0, responce.data.length)
            }
            setRandomProducID(randomproduct)
              
        } 
        
    }   

    const selectType = (newtype)=>{
        settype(newtype)
        if(newtype!=''){
            let topButtonDiv = document.querySelector('.buttons-type')
            let topTypeButtons = topButtonDiv.querySelectorAll('button')
            topTypeButtons.forEach((elem)=>{
                elem.classList.remove('underlined')
            })
            let elem2 = document.getElementById(`${newtype}`).classList.add('underlined')
        }

    }

    const GetRandomDiscount = (price) =>{
        const discounts = [10,20,30]
        const discount = discounts[getRandomNumber(0,2)]
        const newPrice = (price - price * discount * 0.01).toFixed(2)

        return(
            <div className="price-box">
                <div className="oldprice">
                    {price.toFixed(2)}$  -{discount}%
                </div>
                   
                <div className="newprice">
                    {newPrice}$
                </div>
            </div>
        )
    }
    const RenderGoods = () => {
        return(
            <div>
                 {allGoodsArray.map((item)=><GoodsBody key={item.id} item={item}/>)}
            </div>
        )
    }
    const DownToPrice = () =>{
        setAllGoodsArray([...allGoodsArray].sort((a,b)=> a.price - b.price))
    }
    const UpToPrice = () =>{
        setAllGoodsArray([...allGoodsArray].sort((a,b)=> b.price - a.price))
    }
    const DownToRate = () =>{
        setAllGoodsArray([...allGoodsArray].sort((a,b)=> a.rating.rate - b.rating.rate))
    }
    const UpToRate= () =>{
        setAllGoodsArray([...allGoodsArray].sort((a,b)=> b.rating.rate - a.rating.rate))
    }
    const DefaultFilter = () =>{
        setdefaultfilter(!defaultfilter)
    }
    return(
        <div className="homepage-layout">
            <div className="buttons-type">
            <button className="button-types-top" id="electronics" onClick={()=>{selectType('electronics')}}>electronics</button>
            <button className="button-types-top" id="jewelery" onClick={()=>{selectType('jewelery')}}>jewelery</button>
            <button className="button-types-top" id="men's clothing" onClick={()=>{selectType(`men's clothing`)}}>men's clothing</button>
            <button className="button-types-top" id="women's clothing" onClick={()=>{selectType(`women's clothing`)}}>women's clothing</button>
            </div>
            <div className="second-block"> 
             <div className="main-carousel">
                <MainCarousel/>
             </div>
             <div className="sale-box">  
             <p className="sale">Акция</p>
                <div className="random-good"> 
                    <div className="random-good-top">
                        
                            {allGoodsArray.length != 0 && <div className="random-good-price">{GetRandomDiscount(allGoodsArray[randomProductID].price)}</div>}
                            {allGoodsArray.length != 0 && <div className="random-good-description">{allGoodsArray[randomProductID].description} </div>}

                    </div>
                    <div className="random-good-main">
                             {allGoodsArray.length != 0 && <img className="random-good-image" src={allGoodsArray[randomProductID].image}/>}
                             {allGoodsArray.length != 0 && <div className="random-good-name">{allGoodsArray[randomProductID].title} </div>}


                    </div>
                </div>
             </div>
            </div>
            <div className="third-block"> 
                <div  className="all-goods-list">
                    <div className="main-filter-top">
                        <button onClick={DownToPrice}>Sort by Down to price</button>
                        <button onClick={DefaultFilter}>Default Filter</button>
                        <button onClick={UpToPrice}>Sort by Up to price</button>
                    </div>
                    <div className="main-filter-bot">
                        <button onClick={DownToRate}>Sort by Down to Rate</button>
                        <button onClick={UpToRate}>Sort by Up to Rate</button>
                    </div>
                <RenderGoods/>
                </div>
            </div>
        </div>

    )
}

export default Homepage
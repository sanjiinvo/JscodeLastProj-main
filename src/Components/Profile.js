


function Profile () {

    const showLog =()=>{
        console.log(localStorage.getItem('FavoriteArray'));
        console.log(localStorage.getItem('BuyArray'));
        
    }
    return(
        <div>
            <button onClick={showLog}>Show</button>
        </div>
    )
}

export default Profile
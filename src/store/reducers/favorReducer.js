


function FavorReducer(state, action){

    const FavorIDS = JSON.parse(localStorage.getItem('FavoriteArray'))
    console.log(`action`, action);
    switch(action.type){
        case 'isFavor' : return {type: action.type, id: action.id}
        case 'BottomGood' : return state
        case 'Basketgood' : return state
        default: return state

    }
}

export default FavorReducer
const initialState = {
    visible:true
}

export default (state = initialState, action)=>{

    switch(action.type){
        case 'SET_VISIBLE':
            return {...state,visible:action.payload.visible}
        break
    }

    return state
}
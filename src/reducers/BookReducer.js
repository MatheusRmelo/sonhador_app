const initialState = {
    title:''
}

export default (state = initialState, action)=>{

    switch(action.type){
        case 'SET_title':
            return {...state,title:action.payload.title}
        break
    }

    return state
}
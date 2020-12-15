const initialState = {
    title:'',
    photo:''
}

export default (state = initialState, action)=>{

    switch(action.type){
        case 'SET_title':
            return {...state,title:action.payload.title}
        break;
        case 'SET_PHOTO':
            return {...state,photo:action.payload.photo}
        break;
    }

    return state
}
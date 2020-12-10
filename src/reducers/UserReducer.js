const initialState = {
    name:'',
    email:'',
    uid: ''
}

export default (state = initialState, action)=>{

    switch(action.type){
        case 'SET_NAME':
            return {...state,name:action.payload.name}
        break
        case 'LOGIN':
            return {...action.payload.user};
        break;
    }


    return state
}
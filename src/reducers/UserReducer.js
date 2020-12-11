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
            return {...state,name:action.payload.name,email:action.payload.email,uid:action.payload.uid};
        break;
        case 'LOGOUT':
            return initialState;
        break;
    }


    return state
}
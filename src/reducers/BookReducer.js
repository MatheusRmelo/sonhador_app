const initialState = {
    title:'',
    photo:'',
    myBooks: [{book: {id:'',title:'',category:''}}]
}

export default (state = initialState, action)=>{

    switch(action.type){
        case 'SET_title':
            return {...state,title:action.payload.title};
        break;
        case 'SET_PHOTO':
            return {...state,photo:action.payload.photo};
        break;
        case 'SET_MYBOOKS':
            return {...state,myBooks:action.payload.texts};
        break;
        case 'SET_CLEANMYBOOK':
            return {...state,myBooks:initialState.myBooks};
        break;
    }

    return state
}
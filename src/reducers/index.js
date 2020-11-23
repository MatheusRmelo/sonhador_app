import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import BookReducer from './BookReducer'

export default combineReducers({
    user: UserReducer,
    book: BookReducer
})
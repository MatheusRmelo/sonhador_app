import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import BookReducer from './BookReducer'
import ActionsReducer from './ActionsReducer'

export default combineReducers({
    user: UserReducer,
    book: BookReducer,
    action: ActionsReducer
})
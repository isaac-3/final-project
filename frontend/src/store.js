import { createStore } from 'redux'
import {persistStore} from 'redux-persist'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const noUserState = {
    user: {id: undefined}
}

const initialState = {
    user: {id: undefined},
    trip_board: undefined
}

const reducer = (currentState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                ...currentState,
                user: action.user
            }
        break;
        case 'AFTER_LOG_IN_PROPS':
            fetch(`http://localhost:3000/users/${action.user.id}`)
            .then(res=>res.json())
            .then(user=>{
                return {
                    ...currentState,
                    user: user
                }
            })
        break;
        case 'LOG_IN_BOARD':
            return {
                ...currentState,
                trip_board: action.trip_board.id
            }
        break;
        case 'LOG_OUT':
            return {
                ...currentState,
                user: noUserState.user
            }
        break;
        case 'LOG_OUT_BOARD':
            return {
                ...currentState,
                trip_board: undefined
            }
        break;
        case 'SET_BOARD_TO_UNDEFINED':
            return {
                ...currentState,
                trip_board: undefined
            }
        break;
        case 'USER_PROPS':
            return {
                ...currentState,
                user: action.user
            }
        break;
        case 'SET_TRIP':
            return {
                ...currentState,
                trip_board: action.trip.id
            }
        break;
        case 'UPD_USER':
            return {
                ...currentState,
                user: action.user
            }
        break;
        case 'UPD_PRO_PIC':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    pic_url: action.pic_url
                }
            }
        break;
        case 'NEW_BOARD':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    trips: [...currentState.user.trips, action.trip]
                }

            }
        break;
        case 'SET_NEW_BOARD':
            return {
                ...currentState,
                trip_board: action.trip.id
            }
        break;
        case 'DELETE_TRIP_BOARD':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    trips: action.trips
                }
            }
        break;
        case 'USE_LAST_BOARD':
            return {
                ...currentState,
                trip_board: action.trip_board.id
            }
        break;
    }
    return currentState
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'trip_board']

}

const persistR = persistReducer(persistConfig, reducer)

export const store = createStore(persistR, initialState)
export const persistor = persistStore(store)

// export default {store, persistor}

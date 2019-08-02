import { createStore } from 'redux';
import openSocket from 'socket.io-client';

const initialState = {
    // socket: openSocket("https://anonchat-backend.herokuapp.com/"),
    socket: openSocket("http://localhost:3300"),
    username: "",
    room: "",
    currentRoomUsers: [],
    numberOfUsersInCurrentRoom: 0,
}

/**
 * Reducer
 */
function stateManager(state = initialState, action) {
    switch (action.type) {
        case 'SET_ROOM_DETAILS':
            return ({
                ...state,
                ...action.data,
            });
            break;
        case 'UPDATE_USER_LIST':
            return ({
                ...state,
                currentRoomUsers: action.data
            })
        default:
            return state
    }
}

let store = createStore(stateManager);

export default store;
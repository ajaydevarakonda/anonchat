import { createStore } from 'redux';
import openSocket from 'socket.io-client';

const initialState = {
    socket: openSocket("https://anonchat-backend.herokuapp.com/"),
    username: "",
    room: "",
    currentRoomUsers: [],
    numberOfUsersInCurrentRoom: 0,
    messages: []
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
        case 'ADD_MSG_TO_LIST':
            return ({
                ...state,
                messages: state.concat(action.data),
            });
            break;
        default:
            return state
    }
}

let store = createStore(stateManager);

export default store;
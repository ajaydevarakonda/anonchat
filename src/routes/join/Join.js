import React, { Component } from "react";
import { connect } from 'react-redux';
import store from '../../store';
import './Join.css';

function randomHash(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class JoinComponent extends Component {
    constructor(props) {
        super(props);

        this.joinRoom = this.joinRoom.bind(this);
        this.joinRandomRoom = this.joinRandomRoom.bind(this);
        this._joinRoom = this._joinRoom.bind(this);
    }

    joinRoom() {
        const hashInput = document.querySelector("#hash");
        const hash = hashInput.value;
        this._joinRoom(hash);
    }

    joinRandomRoom() {
        const hash = randomHash(64);
        this._joinRoom(hash);
    }

    _joinRoom(hash) {
        const isValidHash = hash.length && (/^[A-Za-z0-9]{64,}$/.test(hash));

        if (!isValidHash) {
            console.log("Error: Invalid hash!");
            return false;
        } else {
            console.log("Loading chat ...");
            this.props.socket.emit('join', hash);
            this.props.socket.on('join-fail', function () {
                console.log("Error: Invalid hash!");
            });

            this.props.socket.on('join-ack', function (msg) {
                const { room, username, users, numberOfUsers } = JSON.parse(msg);
                store.dispatch({ type: 'SET_ROOM_DETAILS', data: {
                    room, username, currentRoomUsers: users, numberOfUsersInCurrentRoom: numberOfUsers
                } });
                window.location.hash = "/chat"
            });
        }
    }


    render() {
        return (
            <div className="joinWrapper">
                <h1 className="logo">ANONCHAT</h1>
                <div className="fadein-right formContainer">
                    <div className="inputWrapper">
                        <input type="text" className="join-input" placeholder="Please enter room id" id="hash" />
                    </div>
                    <div className="buttonsWrapper">
                        <button onClick={this.joinRoom} className="join-chat">join</button>
                        <button onClick={this.joinRandomRoom} className="create-chat">
                            create
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return { ...state };
};

export const Join = connect(mapStateToProps)(JoinComponent);

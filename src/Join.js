import React, { Component } from "react";
import { connect } from 'react-redux';
import store from './store';

function randomHash(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class Join extends Component {
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
                console.log(msg);
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
            <div>
                <div className="join-page-container">
                    <h1>ANONCHAT.</h1>
                    <div>
                        <div>
                            <input type="text" className="join-input" placeholder="room hash..." id="hash" />
                            <button onClick={this.joinRoom} className="join-btn">JOIN</button>
                        </div>
                        <br />
                        or{" "}
                        <a href="#" onClick={this.joinRandomRoom} className="special create-chat">
                            create chat
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return { ...state };
};

export default connect(mapStateToProps)(Join);

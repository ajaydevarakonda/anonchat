import React from 'react';
import ChatContext from './ChatContext';

function randomHash(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class Join extends React.Component {
    constructor(props) {
        super(props);

        this.showAlert = this.showAlert.bind(this);
        this.setContextState = props.setContextState.bind(this);

        this._joinChat = this._joinChat.bind(this);
        this.joinChat = this.joinChat.bind(this);
        this.joinRandomChat = this.joinRandomChat.bind(this);
    }

    showAlert(message, timeout = 4000) {
        var snackBar = document.querySelector('#toast');
        var data = { message, timeout };
        snackBar.MaterialSnackbar.showSnackbar(data);
    }    

    joinRandomChat(e) {
        const hash = randomHash(64);
        this._joinChat(hash);
    }


    _joinChat(hash) {
        const self = this;
        const isValidHash = hash.length && (/^[A-Za-z0-9]{64,}$/.test(hash));

        if (!isValidHash) {
            this.showAlert("Error: Invalid hash!", 1000)
            return false;
        } else {
            this.showAlert("Loading chat ...", 500);
            this.context.socket.emit('join', hash);
            this.context.socket.on('join-fail', function () {
                self.showAlert("Error: Invalid hash!", 1000);
            });

            this.context.socket.on('join-ack', function (msg) {
                const { room, username, users, numberOfUsers } = JSON.parse(msg);
                self.setContextState({
                    room, username, currentRoomUsers:users, numberOfUsersInCurrentRoom: numberOfUsers,
                });
                window.location.hash = "/chat"
            });
        }
    }

    joinChat(e) {
        e.preventDefault();
        const hashInput = document.querySelector("#hash");
        const hash = hashInput.value;
        this._joinChat(hash);
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                {/* ======================================================================
                MAIN CONTENT */}
                <main className="mdl-layout__content">
                    <div className="mdl-grid mdl-grid--no-spacing">
                        {/* ==================================================================
                            SIDENAV  */}
                        <div className="mdl-cell mdl-cell--2-col sidenav vh100 text-center">
                            <h5>ANONCHAT</h5>
                        </div>
                        {/* ==================================================================
                            /SIDENAV  */}

                        {/* ==================================================================
                            JOIN */}
                        <div className="mdl-cell mdl-cell--10-col joinform">
                            <form onSubmit={this.joinChat}>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" id="hash" />
                                    <label className="mdl-textfield__label" htmlFor="hash">Chat room hash</label>
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                                            Join
                                </button>
                            </form>

                            <h4>or</h4>
                            <br/>

                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                onClick={this.joinRandomChat}>
                                Create
                            </button>
                            &nbsp;&nbsp;
                            <span id="new-room-literal">new room</span>
                        </div>
                        {/* ==================================================================
                            /JOIN */}
                    </div>
                </main>
                {/* ==========================================================================
                /MAIN CONTENT */}
            </div>
        );
    }
}

Join.contextType = ChatContext;
export default Join;


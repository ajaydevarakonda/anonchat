import React from 'react';

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.socket = props.socket;
        this.joinChat = this.joinChat.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    showMessage(message, timeout=4000) {
        var snackBar = document.querySelector('#toast');
        var data = { message, timeout };
        snackBar.MaterialSnackbar.showSnackbar(data);
    }

    joinChat(e) {
        e.preventDefault();
        const hashInput = document.querySelector("#hash");
        const hash = hashInput.value;
        const isValidHash = hash.length && (/^[A-Za-z0-9]{64,}$/.test(hash));

        if (! isValidHash) {
            // check if the hash is valid
            this.showMessage("Error: Invalid hash!")
            return false;
        } else {
            this.showMessage("Loading chat ...");
            this.state.socket.emit('join', hash);
            this.state.socket.on('join-fail', function() {
                this.showMessage("Error: Invalid hash!");
            });
            this.state.socket.on('join-ack', function(msg){
                window.location.href = "/chat";                
            });
        }
    }

    render() {
        return (
            <div className="App">
                {/* ================================================================================
        NAVBAR */}
                <div className="navbar">
                    <div className="mdl-layout mdl-js-layout">
                        <header className="mdl-layout__header">
                            <div className="mdl-layout__header-row">
                                {/* Add an image here */}
                                <span className="mdl-layout-title">AnonChat</span>
                                <div className="mdl-layout-spacer"></div>
                            </div>
                        </header>
                    </div>
                </div>


                {/* ================================================================================
        MAIN CONTENT */}
                <main id="join-chat">
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
                </main>

                <div id="toast" className="mdl-js-snackbar mdl-snackbar">
                    <div className="mdl-snackbar__text"></div>
                    <button className="mdl-snackbar__action" type="button"></button>
                </div>
            </div>
        );
    }
}

export default Join;
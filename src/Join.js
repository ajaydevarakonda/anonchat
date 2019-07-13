import React from 'react';

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // This binding is necessary to make `this` work in the callback
        this.joinChat = this.joinChat.bind(this);
    }

    joinChat(e) {
        e.preventDefault();
        const hashInput = document.querySelector("#hash");
        const hash = hashInput.value;

        // do something with the hash
        // when done redirect to chat
        // this.history.pushState(null, 'chat');
        window.location.href = "/chat";
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
            </div>
        );
    }
}

export default Join;
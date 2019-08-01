import React from 'react';
import PropTypes from 'prop-types';

function ChatMessage(props) {
    return (
        <div className="mdl-grid mdl-grid--no-spacing chat-message">
            <header className="mdl-cell mdl-cell--1-col-desktop">                                
                <div className="chat-pic">
                </div>
            </header>
            <div className="mdl-card mdl-cell mdl-cell--9-col-desktop">
                <div className="mdl-card__supporting-text">
                    <div>
                        <span className="username">{props.sender}</span>
                        &nbsp;&nbsp;
                        <span className="timestamp">{(new Date(props.timestamp)).toLocaleString()}</span>
                    </div>
                    <span className="user-message">{props.message}</span>
                </div>
            </div>                            
        </div>
    );
}

ChatMessage.propTypes = {
    sender: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
}

export default ChatMessage;
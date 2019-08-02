import React from 'react';
import PropTypes from 'prop-types';

function Message(props) {
    return (
        <div className="message">
            <div className="pic">
                <img
                    src={`http://www.gravatar.com/avatar/${props.sender}?s=50&r=pg&d=identicon`}
                    alt="user icon"
                />
            </div>
            <div className="message-content">
                <span className="sender-username">{props.sender}</span>
                <p className="message-body">
                    {props.message}
                </p>
            </div>
        </div>
    );
}

Message.propTypes = {
    sender: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
}

export default Message;
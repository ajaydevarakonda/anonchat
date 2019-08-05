import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';


function Message(props) {
    return (
        <div className="message">
            <div className="pic">
                <img
                    src={`http://www.gravatar.com/avatar/${props.username}?s=50&r=pg&d=identicon`}
                    alt="user icon"
                />
            </div>
            <div className="message-content">
                <span className="sender-username">{props.username}</span>{" "}
                <span className="muted">{new Date(props.timestamp).toLocaleString()}</span>
                <p className="message-body">
                    {parse(props.message)}
                </p>
            </div>
        </div>
    );
}

Message.propTypes = {
    username: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
}

export default Message;
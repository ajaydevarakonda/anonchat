import React, { Component } from 'react';

class Join extends Component {
    render() {
        return (
            <div>
                <div class="join-page-container">
                    <h1>ANONCHAT.</h1>
                    <div>
                        <div>
                            <input type="text" class="join-input"/>
                            <button class="join-btn">JOIN</button>
                        </div>

                        <br/>
                        or <a href="#" class="special create-chat">create chat</a>
                    </div>
                </div>
            </div>
        );
            }
        }
        
export default Join;
import React from 'react';
import SockJsClient from 'react-stomp';
import {HOST} from '../commons/hosts';

class CaregiverNotification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

     displayMessages = () => {
        return (
            <div>
                {this.state.messages.map(msg => {
                    return (
                        <div>
                            <p>{msg}</p>
                        </div>)
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="align-center">
                    {this.displayMessages()}
                </div>
                <SockJsClient url = {HOST.backend_api + '/websocket-chat'}
                     topics={['/topic/notifications']}
                     onConnect={() => {
                          console.log("connected");
                     }}
                     onDisconnect={() => {
                          console.log("Disconnected");
                     }}
                     onMessage={(msg) => {
                          var m = this.state.messages;
                          m.push(msg);
                          console.log(msg);
                          this.setState({messages: m});
                          console.log(this.state);
                     }}
                     ref={(client) => {
                          this.clientRef = client
                     }}/>
            </div>
        )
    }
}

export default CaregiverNotification;

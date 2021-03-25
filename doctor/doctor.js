import React from 'react';
import NavigationBar from './navigation-bar';
import BackgroundImg from '../commons/images/future-medicine.jpg';
import AuthService from "../services/auth-service";
import {withRouter} from "react-router-dom";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "900px",
    backgroundImage: `url(${BackgroundImg})`
};

const welcome = {
    paddingTop: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 24
};

class Doctor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            content: ""
        };
    }

    componentDidMount() {
        if(this.state.currentUser === null || this.state.currentUser.roles != "ROLE_DOCTOR") {
            window.location.href = "/error/unauthorized";
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />
                    <p style={backgroundStyle}>
                        <p style={welcome}>
                            Welcome back doctor!
                        </p>
                    </p>
            </div>
        )
    };
}

export default Doctor
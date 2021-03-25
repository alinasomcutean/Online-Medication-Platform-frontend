import React from 'react';
import Button from "react-bootstrap/Button";
import { FormGroup, Label, Input } from 'reactstrap';
import * as API_LOGIN from './login-api';
import { Redirect, withRouter } from 'react-router-dom';
import AuthService from "../services/auth-service";

const title = {
    textAlign: 'center',
    paddingTop: 80,
    paddingBottom: 80,
    color: 'CornflowerBlue'
}

const formStyle = {
    paddingTop: 10,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center'
}

const inputStyle = {
    width: 500
}

const labelStyle = {
    paddingRight: 40
}

const buttonStyle = {
    marginTop: 80,
    marginLeft: 680
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: {
                value: '',
                placeholder: 'Enter username...',
                touched: false
            },
            password: {
                value: '',
                placeholder: 'Enter password...',
                touched: false
            },
            accountData: '',
            error: null,
            errorStatus: 0,
            userId: '',
            errorStatus: 0,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
     }

    checkCredentials(account) {
        return API_LOGIN.checkLogin(account, (result, status, err) => {
            if(result !== null && status === 200) {
                console.log("result", result);
                this.setState({
                    accountData: result,
                    userId: result.id
                });
            } else {
                this.setState({
                    error: err,
                    errorStatus: status
                });
            }
        });
    }

    componentDidMount() {
        AuthService.logout();
        console.log(AuthService.getCurrentUser());
    }

    handleLogin() {
        let account = {
            username: this.state.username.value,
            password: this.state.password.value
        };

        console.log(account);
        AuthService.login(account.username, account.password).then(
            (response) => {
                if(response.roles == 'ROLE_DOCTOR') {
                    console.log(response);
                    this.props.history.push("/doctor");
                    window.location.reload();
                }
                if(response.roles == "ROLE_PATIENT") {
                    console.log(response);
                    this.props.history.push("/patient/" + response.id);
                    window.location.reload();
                }
                if(response.roles == "ROLE_CAREGIVER") {
                    console.log(response);
                    this.props.history.push("/caregiver/" + response.id);
                    window.location.reload();
                }
            }
        )
        console.log(AuthService.getCurrentUser());
     }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        const updatedFormElements = this.state[name];

        updatedFormElements.value = value;
        updatedFormElements.touched = true;
        this.setState({
            updatedFormElements
        })
     }

    render() {
        return (
            <div>
                <h1 style={title}>Welcome to our medical monitoring platform</h1>
                <FormGroup style={formStyle}>
                    <Label style={labelStyle}>Username: </Label>
                    <Input style={inputStyle} name="username" placeholder={this.state.username.placeholder}
                        defaultValue={this.state.username.value}
                        onChange={this.handleChange}
                        touched={this.state.username.touched? 1 : 0}
                    />
                </FormGroup>
                <FormGroup style={formStyle}>
                    <Label style={labelStyle}>Password: </Label>
                    <Input style={inputStyle} name="password" type={"password"} placeholder={this.state.password.placeholder}
                        defaultValue={this.state.password.value}
                        onChange={this.handleChange}
                        touched={this.state.password.touched? 1 : 0}
                    />
                </FormGroup>
                <Button style={buttonStyle} type={"submit"} onClick={this.handleLogin}> Login </Button>
            </div>
        )
    };
}

export default withRouter(Login);

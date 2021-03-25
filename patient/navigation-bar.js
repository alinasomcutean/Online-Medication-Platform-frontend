import React from 'react';
import { Button, Navbar } from 'reactstrap';
import authService from '../services/auth-service';

const textStyle = {
    color: 'white',
    textDecoration: 'none',
    height: '40px',
    marginLeft: '40%',
    fontSize: 24,
    paddingTop: 15
};

const buttonStyle = {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 25
}

const NavigationBar = () => (
     <div>
         <Navbar color="dark" light expand="md" style={{ height: '60px'}}>
            <h1 style={textStyle}>Welcome back, patient!</h1>
            <Button style={buttonStyle} href="/">Logout</Button>
         </Navbar>
     </div>
);

export default NavigationBar

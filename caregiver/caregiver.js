import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavigationBar from './navigation-bar';
import CargPatientsTable from './components/carg-patients-table';
import * as API_USERS from "./components/caregiver-api.js";
import authService from '../services/auth-service';

const headerStyle = {
    color: 'black',
    textDecoration: 'none',
    height: '50px',
    marginLeft: '40%',
    fontSize: 24,
    paddingTop: 15
};

class Caregiver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{
                id: '',
                firstName: '',
                lastName: '',
                dateBirth: '',
                gender: '',
                address: '',
                username: '',
                password: '',
                medicalRecord: ''
            }],
            currentUser: authService.getCurrentUser()
        };
        this.mapGetPatients = this.mapGetPatients.bind(this)
    }

    defineGender(result) {
        var g = result.userDto.gender;
        if (g === 1) {
            return "Male";
        } else {
            if (g === 2) {
                return "Female";
            } else {
                return "Other";
            }
        }
    }

    mapGetPatients(result) {
        var addr = result.userDto.addressDto;
        var acc = result.userDto.accountDto;

        let data = {
            id: result.id,
            firstName: result.userDto.firstName,
            lastName: result.userDto.lastName,
            dateBirth: result.userDto.dateBirth,
            gender: this.defineGender(result),
            address: addr.street + " nr. " + addr.streetNumber + ", " + addr.city + ", " + addr.country,
            username: acc.username,
            password: acc.password,
            medicalRecord: result.medicalRecordDto.description
        }

        return data;
    }

    fetchPatients() {
        return API_USERS.getPatientsForCaregiver(this.state.currentUser.id, (result, status, err) => {
            if (result !== null && status === 200) {
                console.log(result);
                this.setState({
                    items: result.map(this.mapGetPatients)
                });
                console.log(this.state.items);
            }
        })
    }

    componentDidMount() {
        if(this.state.currentUser === null || this.state.currentUser.roles != "ROLE_CAREGIVER") {
            window.location.href = "/error/unauthorized";
        } else {
            this.fetchPatients();
        }
    }

    render() {

        return (
            <div>
                <NavigationBar />
                <h1 style={headerStyle}>Welcome back, caregiver!</h1>
                <br />
                <Container>
                    <Row>
                        <Col>
                            <h1>List of patients</h1>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <CargPatientsTable items={this.state.items}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


}

export default Caregiver;
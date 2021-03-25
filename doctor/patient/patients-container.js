import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import PatientTable from './components/patient-table';
import * as API_USERS from "../api/doctor-patients-api.js";
import NavigationBar from '../navigation-bar';
import ModalForm from './components/modal';
import AuthService from "../../services/auth-service";

class PatientContainer extends React.Component {
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
            currentUser: AuthService.getCurrentUser()
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
        return API_USERS.getPatients((result, status, err) => {
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
        if(this.state.currentUser === null || this.state.currentUser.roles != "ROLE_DOCTOR") {
            window.location.href = "/error/unauthorized";
        } else {
            this.fetchPatients();
        }
    }

    addItemToState = (item) => {
        this.setState(prevState => ({
            items: [...prevState.items, item]
        }))
    }

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id === item.id)
        const newArray = [
            ...this.state.items.slice(0, itemIndex),
            item,
            ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({
            items: newArray
        })
    }

    deleteItemFromState = (id) =>{
        const updatedItems = this.state.items.filter(item => item.id !== id)
        this.setState({
            items: updatedItems
        })
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br/>
                <Container className="doctorPatients">
                    <Row>
                        <Col>
                            <h1>General information about patients</h1>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <PatientTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ModalForm buttonLabel="Add Patient" addItemToState={this.addItemToState}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default PatientContainer;
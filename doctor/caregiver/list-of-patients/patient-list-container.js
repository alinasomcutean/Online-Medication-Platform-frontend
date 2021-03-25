import React from 'react';
import * as API_USERS from "../../api/doctor-caregiver-api.js";
import PatientListTable from "./list-patient-table.js";
import NavigationBar from '../../navigation-bar';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import AuthService from "../../../services/auth-service";

class PatientListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [{
                id: '',
                name: '',
                dateBirth: '',
                gender: '',
                address: '',
                username: '',
                password: '',
                medicalRecord: ''
            }],
            isLoaded: false,
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
            name: result.userDto.firstName + " " + result.userDto.lastName,
            dateBirth: result.userDto.dateBirth,
            gender: this.defineGender(result),
            address: addr.street + " nr. " + addr.streetNumber + ", " + addr.city + ", " + addr.country,
            username: acc.username,
            password: acc.password,
            medicalRecord: result.medicalRecordDto.description
        }

        this.setState({
            tableData: data
        })

        return this.state.tableData;
    }

    fetchPatients() {
        var patientId = window.location.href.split("/");
        return API_USERS.getPatientsForCaregiver(patientId[5], (result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result.map(this.mapGetPatients),
                    isLoaded: true
                });
                console.log("result", this.state.tableData);
            }
        })
    }

    componentDidMount() {
        if(this.state.currentUser === null || this.state.currentUser.roles != "ROLE_DOCTOR" && this.state.currentUser.roles != "ROLE_CAREGIVER") {
            window.location.href = "/error/unauthorized";
        } else {
            this.fetchPatients();
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br />
                <CardHeader>
                    <strong>Patients</strong>
                </CardHeader>
                <Card>
                    <br />
                    <Row>
                        <Col>
                            {this.state.isLoaded &&
                            <PatientListTable tableData={this.state.tableData} />}
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default PatientListContainer;
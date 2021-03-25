import React from 'react';
import { Container } from 'reactstrap';
import NavigationBar from './navigation-bar';
import * as API_USERS from "./api/patient-api";
import * as API_MEDPLANS from "../doctor/api/doctor-patients-api";
import MedicationPlansTable from "../doctor/patient/medicationplans/components/medication-plans-table";
import authService from '../services/auth-service';

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {
                id: '',
                name: '',
                dateBirth: '',
                gender: '',
                address: '',
                username: '',
                password: '',
                medicalRecord: ''
            },
            medicationPlans: [{
                intakeIntervals: '',
                periodStart: '',
                periodEnd: '',
                medicationsDtos: [{
                    name: '',
                    dosage: '',
                    sideEffectsDtos: [{
                        name: ''
                    }]
                }]
            }],
            currentUser: authService.getCurrentUser()
        };
        this.defineGender = this.defineGender.bind(this);
        this.mapProfile = this.mapProfile.bind(this);
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

    mapProfile(result) {
        var user = result.userDto;
        var addr = user.addressDto;

        let profileData = {
            id: result.id,
            name: user.firstName + " " + user.lastName,
            dateBirth: user.dateBirth,
            gender: this.defineGender(result),
            address: addr.street + " " + addr.streetNumber + ", " + addr.city + ", " + addr.country,
            username: user.accountDto.username,
            password: user.accountDto.password,
            medicalRecord: result.medicalRecordDto.description
        }

        return profileData;
    }

    fetchPatient() {
        var patientId = window.location.href.split("/");
        return API_USERS.getLoggedInPatient(this.state.currentUser.id, (result, status, error) => {
            if(result !== null && status === 200) {
                var medicationPlans = result.medicationPlanDtoList;
                console.log("med plans", medicationPlans);
                this.setState ({
                    profileData: this.mapProfile(result),
                    medicationPlans: medicationPlans.map(this.mapMedicationPlan)
                });
            }
        })
    }

    mapMedicationPlan(result) {
        let data = {
            intakeIntervals: result.intakeIntervals,
            periodStart: result.periodStart,
            periodEnd: result.periodEnd,
            medicationsDtos: result.medicationDtos
        };
        return data;
    }

    componentDidMount() {
        if(this.state.currentUser === null || this.state.currentUser.roles != "ROLE_PATIENT") {
            window.location.href = "/error/unauthorized";
        } else {
            this.fetchPatient();
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br />
                <Container>
                    <p>Profile</p>
                    <ul>
                        <li>Name: {this.state.profileData.name}</li>
                        <li>Birthday: {this.state.profileData.dateBirth}</li>
                        <li>Gender: {this.state.profileData.gender}</li>
                        <li>Address: {this.state.profileData.address}</li>
                        <li>Username: {this.state.profileData.username}</li>
                        <li>Password: {this.state.profileData.password}</li>
                        <li>Medical record: {this.state.profileData.medicalRecord}</li>
                    </ul>
                </Container>
                <Container>
                    <p>Medication plans</p>
                    <MedicationPlansTable items={this.state.medicationPlans}/>
                </Container>
            </div>
        )
    }
}

export default Patient;
import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap'
import * as API_USERS from "../../api/doctor-patients-api.js";
import NavigationBar from '../../navigation-bar';
import MedicationPlansTable from './components/medication-plans-table';
import {withRouter} from "react-router-dom";
import AuthService from "../../../services/auth-service";

class MedicationPlansContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{
                id: '',
                intakeIntervals: '',
                periodStart: '',
                periodEnd: '',
                medicationsDtos: [{
                    id: '',
                    name: '',
                    sideEffectsDtos: [{
                        id: '',
                        name: ''
                    }],
                    dosage: ''
                }]
            }],
            currentUser: AuthService.getCurrentUser()
        };
        this.mapMedicationPlan = this.mapMedicationPlan.bind(this);
    }

    mapMedicationPlan(result) {
        let data = {
            id: result.id,
            intakeIntervals: result.intakeIntervals,
            periodStart: result.periodStart,
            periodEnd: result.periodEnd,
            medicationsDtos: result.medicationDtos
        };
        return data;
    }

    fetchMedicalPlans() {
        var patientId = window.location.href.split("/");
        return API_USERS.getMedicationPlansForPatient(patientId[5], (result, status, error) => {
            if(result !== null && (status === 200)) {
                this.setState({
                    items: result.map(this.mapMedicationPlan)
                });

            }
        })
    }

    componentDidMount() {
        console.log(this.state.currentUser === null);
        console.log(this.state.currentUser.roles != "ROLE_DOCTOR");
        console.log(this.state.currentUser.roles != "ROLE_CAREGIVER");
        if(this.state.currentUser === null || (this.state.currentUser.roles != "ROLE_DOCTOR" && this.state.currentUser.roles != "ROLE_CAREGIVER")) {
            window.location.href = "/error/unauthorized";
        } else {
            this.fetchMedicalPlans();
        }
    }

    render () {
        return (
            <div>
                <NavigationBar />
                <br />
                <Container>
                    <Row>
                        <Col>
                            <h1>Medication plans</h1>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <MedicationPlansTable items={this.state.items}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={() => {
                                var patientId = window.location.href.split("/");
                                this.props.history.push('/addMedicationPlan' + "/" + patientId[5]);
                            }}>Add medication plan</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(MedicationPlansContainer);
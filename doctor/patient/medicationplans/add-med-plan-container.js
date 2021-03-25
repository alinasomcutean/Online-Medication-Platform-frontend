import React from 'react';
import {Container, FormGroup, Label, Input, Button, Form} from 'reactstrap';
import Select from "react-select";
import * as API_USERS from "../../api/doctor-patients-api.js";
import NavigationBar from '../../navigation-bar';
import {withRouter} from "react-router";
import AuthService from "../../../services/auth-service";

class AddMedPlanContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            medicationDtos: [],
            selectedMedications: [],
            medicationList: [],
            intakeIntervals: '',
            periodStart: '',
            periodEnd: '',
            currentUser: AuthService.getCurrentUser()
        };
        this.handleMedicationPlan = this.handleMedicationPlan.bind(this);
    }

    createNewMedicationPlan(medicationPlan) {
        var patientId = window.location.href.split("/");
        console.log("pid", patientId[4]);
        return API_USERS.createMedicationPlan(patientId[4], medicationPlan, (result, status, error) => {
            if(result !== null && (status === 200)) {
                console.log(result);
                //this.props.history.push('/patients');
            }
            window.location.reload(false);
        })
    }

    getMedications() {
        return API_USERS.getMedications((result, status, error) => {
            if(result !== null && (status === 200)) {
                this.setState({
                    medicationList: result
                });
                console.log(result);
            }
        })
    }

    handleMedicationPlan = e => {
        e.preventDefault();
        let medicationPlan = {
            medicationDtos: this.state.medicationDtos,
            intakeIntervals: this.state.intakeIntervals,
            periodStart: this.state.periodStart,
            periodEnd: this.state.periodEnd
        }
        console.log("medication plan", medicationPlan);
        this.createNewMedicationPlan(medicationPlan);
        //this.props.history.push('/patients');
    }

    componentDidMount() {
        if(this.state.currentUser === null || (this.state.currentUser.roles != "ROLE_DOCTOR" && this.state.currentUser.roles != "ROLE_CAREGIVER")) {
            window.location.href = "/error/unauthorized";
        } else {
            this.getMedications();
        }
    }

    chooseOption (e) {
        console.log("e", e);
        this.setState({
            selectedMedications: e
        })

        for(const [index, val] of this.state.medicationList.entries()) {
            console.log("index", index);
            console.log("val", val);
            console.log("e", e);
            if(val.id === e[0].value) {
                console.log("in if");
                this.state.medicationDtos.push(val);
            }
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const options = this.state.medicationList.map(m => ({
            "value": m.id,
            "label": m.name
        }))

        return (
            <div>
                <NavigationBar />
                <br />
                <h1>Add medication plan</h1>
                <Form onSubmit={this.handleMedicationPlan}>
                    <FormGroup>
                        <Label>Intake Intervals</Label>
                        <Input type="text" name="intakeIntervals" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Start Date</Label>
                        <Input type="text" name="periodStart" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>End Date</Label>
                        <Input type="text" name="periodEnd" onChange={this.onChange}/>
                    </FormGroup>
                    <Label>Medications</Label>
                    <Select options={options} onChange={this.chooseOption.bind(this)} isMulti/>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default AddMedPlanContainer;
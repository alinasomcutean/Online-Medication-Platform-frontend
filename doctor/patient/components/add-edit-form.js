import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as API_USERS from "../../api/doctor-patients-api.js";

class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            dateBirth: '',
            gender: '',
            address: '',
            username: '',
            password: '',
            medicalRecord: ''
        };
        this.handleGender = this.handleGender.bind(this);
        this.handleUser = this.handleUser.bind(this);
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createPatient(user) {
        return API_USERS.createPatient(user, (result, status, error) => {
            if (result !== null && status === 200) {
                console.log("create", result);
            }
        })
    }

    updatePatient(user) {
        return API_USERS.updatePatient(user, (result, status, error) => {
            console.log(user);
            if(result !== null && status === 200) {
                console.log(result);
            }
        })
    }

    handleGender(genderValue) {
        if(genderValue === 'Female') {
            return 2;
        } else {
            if(genderValue === 'Male') {
                return 1;
            } else {
                return 0;
            }
        }
    }

    handleUser() {
        let user = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateBirth: this.state.dateBirth,
            gender: this.handleGender(this.state.gender.value),
            address: this.state.address,
            username: this.state.username,
            password: this.state.password,
            medicalRecord: this.state.medicalRecord
        }
        console.log("user", user);
        console.log("check", this.props.item);
        if(this.props.item) {
            console.log("update");
            this.updatePatient(user);
        } else{
            console.log("create");
            this.createPatient(user);
        }
    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if(this.props.item) {
            const {id, firstName, lastName, dateBirth, gender, address, username, password, medicalRecord} = this.props.item
            this.setState({
                id, firstName, lastName, dateBirth, gender, address, username, password, medicalRecord
            })
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleUser}>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input name="firstName" type="text" onChange={this.onChange} value={this.state.firstName === null ? '' : this.state.firstName}/>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input name="lastName" type="text" onChange={this.onChange} value={this.state.lastName === null ? '' : this.state.lastName}/>
                </FormGroup>
                <FormGroup>
                    <Label>Date Birth</Label>
                    <Input name="dateBirth" type="text" onChange={this.onChange} value={this.state.dateBirth === null ? '' : this.state.dateBirth} placeholder="yyyy-mm-dd"/>
                </FormGroup>
                <FormGroup>
                    <Label>Gender</Label>
                    <Input name="gender" type="text" onChange={this.onChange} value={this.state.gender === null ? '' : this.state.gender}/>
                </FormGroup>
                <FormGroup>
                    <Label>Address</Label>
                    <Input name="address" type="text" onChange={this.onChange} value={this.state.address === null ? '' : this.state.address} placeholder="Street nr x city country"/>
                </FormGroup>
                <FormGroup>
                    <Label>Username</Label>
                    <Input name="username" type="text" onChange={this.onChange} value={this.state.username === null ? '' : this.state.username}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input name="password" type="text" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password}/>
                </FormGroup>
                <FormGroup>
                    <Label>Medical Record Description</Label>
                    <Input name="medicalRecord" type="text" onChange={this.onChange} value={this.state.medicalRecord === null ? '' : this.state.medicalRecord}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm;
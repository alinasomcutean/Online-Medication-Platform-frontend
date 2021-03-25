import React from 'react';
import * as API_USERS from "../../api/doctor-medications-api";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from "react-select";
import {withRouter} from "react-router-dom";

class MedAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            dosage: '',
            sideEffectsDtos: [],
            sideEffectsList: [],
            selectedSideEffects: []
        };
        this.handleMedication = this.handleMedication.bind(this);
        this.chooseOption = this.chooseOption.bind(this);
    }

    createMedication(medication) {
        console.log("med", medication)
        return API_USERS.createMedication(medication, (result, status, error) => {
            if(result !== null && status === 200) {
                console.log("medication created");
            }
        })
    }

    updateMedication(medication) {
        return API_USERS.updateMedication(medication, (result, status, error) => {
            if(result !== null && status === 200) {
                console.log("medication updated");
            }
        })
    }

    getSideEffects() {
        return API_USERS.getSideEffects((result, status, error) => {
            if(result !== null && (status === 200)) {
                this.setState({
                    sideEffectsList: result
                });
                console.log("side effects lists");
            }
        })
    }

    handleMedication = e => {
        e.preventDefault();
        let medication = {
            id: this.state.id,
            name: this.state.name,
            dosage: this.state.dosage,
            sideEffectsDtos: this.state.sideEffectsDtos
        }

        if(this.props.item) {
            this.updateMedication(medication);
        } else {
            this.createMedication(medication);
        }

        window.location.reload(false);
    }

    componentDidMount() {
        if(this.props.item) {
            const {id, name, dosage} = this.props.item
            this.setState ({
                id, name, dosage
            })
        }
        this.getSideEffects();
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    chooseOption (e) {
        this.setState ({
            selectedSideEffects: e

        })

        for(const [index, val] of this.state.sideEffectsList.entries()) {
            console.log("index", index);
            console.log("val", val);
            console.log("e", e);
            if(val.id === e[e.length - 1].value) {
                console.log("in if");
                this.state.sideEffectsDtos.push(val);
            }

        }
    }

    render() {
        const options = this.state.sideEffectsList.map(s => ({
            "value": s.id,
            "label": s.name
        }))

        return (
            <Form onSubmit={this.handleMedication}>
                <FormGroup>
                    <Label>Medication name</Label>
                    <Input name="name" type="text" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
                </FormGroup>
                <FormGroup>
                    <Label>Dosage</Label>
                    <Input name="dosage" type="text" onChange={this.onChange} value={this.state.dosage === null ? '' : this.state.dosage} />
                </FormGroup>
                <Label>Side effects</Label>
                <Select options={options} onChange={this.chooseOption} isMulti/>
                <br />
                <Button>Submit</Button>
            </Form>
        )
    }
}

export default withRouter(MedAddEdit);
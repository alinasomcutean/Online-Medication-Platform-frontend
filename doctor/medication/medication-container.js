import React from 'react';
import NavigationBar from '../navigation-bar';
import { Container, Row, Col } from 'reactstrap';
import * as API_USERS from "../api/doctor-medications-api";
import MedicationTable from "./components/medication-table";
import MedicationModal from "./components/medication-modal";
import AuthService from "../../services/auth-service";

class MedicationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{
                id: '',
                name: '',
                dosage: '',
                sideEffectsDtos: [{
                    id: '',
                    name: ''
                }]
            }],
            currentUser: AuthService.getCurrentUser()
        };
        this.mapMedications = this.mapMedications.bind(this);
    }

    mapMedications(result) {
        let data = {
            id: result.id,
            name: result.name,
            dosage: result.dosage,
            sideEffectsDtos: result.sideEffectsDtos
        }

        return data;
    }

    fetchMedications() {
        return API_USERS.getMedications((result, status, error) => {
            if (result !== null && status === 200) {
                console.log(result);
                this.setState ({
                    items: result.map(this.mapMedications)
                });
            }
        })
    }

    componentDidMount() {
        this.fetchMedications();
        if(this.state.currentUser === null || this.state.currentUser.roles != "ROLE_DOCTOR") {
            window.location.href = "/error/unauthorized";
        } else {
            this.fetchMedications();
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
                <br />
                <Container>
                    <Row>
                        <Col>
                            <h1>Medications Info</h1>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <MedicationTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MedicationModal buttonLabel="Add medication" addItemToState={this.addItemToState} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MedicationContainer
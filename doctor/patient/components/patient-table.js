import React from 'react';
import {Table, Button} from 'reactstrap';
import {withRouter} from "react-router-dom";
import ModalForm from './modal';
import * as API_USERS from "../../api/doctor-patients-api.js";


class PatientTable extends React.Component {

    deleteThisPatient(id) {
        return API_USERS.deletePatient(id, (result, status, error) => {
            if(status === 200) {
                console.log("deleted");
            }
        })
    }

    deleteAndReload(id) {
        this.deleteThisPatient(id);
        window.location.reload(false);
    }

    render() {
        const items = this.props.items.map(item => {
            return (
                <tr key={item.id} >
                    <td onClick={ () => {
                        this.props.history.push('/patient/medicationPlans/' + item.id);
                    }}>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.dateBirth}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.medicalRecord}</td>
                    <td>
                        <div>
                            <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                            <Button color="danger" onClick={ () => this.deleteAndReload(item.id)}>Delete</Button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date Birth</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Medical Record</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }
}

export default withRouter(PatientTable)
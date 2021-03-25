import React from 'react';
import {Table, Button} from 'reactstrap';
import * as API_USERS from "../../api/doctor-caregiver-api.js";
import CaregiverModal from './caregiver-model';
import {withRouter} from "react-router-dom";

class CaregiverTable extends React.Component {

    deleteThisCaregiver(id) {
        return API_USERS.deleteCaregiver(id, (result, status, error) => {
            if(status === 200) {
                console.log("delete c");
            }
        })
    }

    deleteAndReload(id) {
        this.deleteThisCaregiver(id);
        window.location.reload(false);
    }

    render() {
        const items = this.props.items.map(item => {
            return (
                <tr key={item.id}>
                    <td  onClick={ () => {
                        this.props.history.push('/caregiver/patients/' + item.id);}
                    }>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.dateBirth}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>
                        <div>
                            <CaregiverModal buttonLabel="Edit" item={item} updateState={this.props.updateState} />
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

export default withRouter(CaregiverTable);
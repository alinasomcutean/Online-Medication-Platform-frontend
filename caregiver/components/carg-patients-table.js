import React from 'react';
import {Table} from 'reactstrap';
import {withRouter} from "react-router-dom";

class CargPatientsTable extends React.Component {

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
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }

}

export default withRouter(CargPatientsTable);
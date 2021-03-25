import React from 'react';
import {Table, Button} from 'reactstrap';
import * as API_USERS from "../../api/doctor-medications-api.js";
import SideEffects from "../../patient/medicationplans/side-effects";
import MedicationModal from "./medication-modal";

class MedicationTable extends React.Component {

    deleteMedication(id) {
        return API_USERS.deleteMedication(id, (result, status, erros) => {
            if(status === 200) {
                console.log("medication deleted");
            }
        })
    }

    deleteAndReload(id) {
        this.deleteMedication(id);
        window.location.reload(false);
    }

    render() {
        function mapSideEffects(meds) {
            return (
                meds.map(function (o,i) {
                return <SideEffects
                    key={o.id}
                    item={o}
                    index={i}
                    />
                 })
            );
        }

        const items = this.props.items.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.dosage}</td>
                    <td>{mapSideEffects(item.sideEffectsDtos)}</td>
                    <td>
                        <div>
                            <MedicationModal buttonLabel="Edit" item={item} updateState={this.props.updateState} />
                            <Button color="danger" onClick={ () => this.deleteAndReload(item.id)}>Delete</Button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Medication name</th>
                        <th>Dosage</th>
                        <th>SideEffects</th>
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

export default MedicationTable
import React from 'react';
import {Table, Button} from 'reactstrap';
import Medication from '../medication';

class MedicationPlans extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.items);
        this.state = {
            item: props.items
        }
    }

    render() {
        function mapMedication(meds) {
            return (
                meds.map(function (o,i) {
                return <Medication
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
                    <td>{item.intakeIntervals}</td>
                    <td>{item.periodStart}</td>
                    <td>{item.periodEnd}</td>
                    <td>{mapMedication(item.medicationsDtos)}</td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Intake Intervals</th>
                        <th>Period Start</th>
                        <th>Period End</th>
                        <th>Medications</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }
}

export default MedicationPlans
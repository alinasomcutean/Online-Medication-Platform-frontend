import React from 'react';
import SideEffect from './side-effects';

class Medication extends React.Component {
    constructor(props) {
        console.log("med props", props);
        super(props);
        this.state = {
            id: props.item.id,
            name: props.item.name,
            dosage: props.item.dosage,
            sideEffectsDtos: props.item.sideEffectsDtos
        };
    }

    render () {
        function mapSideEffects(sideEff) {
            return (
                sideEff.map(function (o,i) {
                    return <SideEffect
                        key={o.id}
                        item={o}
                        index={i}
                        />
                })
            );
        }

        return (
            <li>
                Name: {this.state.name}; Dosage: {this.state.dosage}; Side Effects: {mapSideEffects(this.state.sideEffectsDtos)}
            </li>
        )
    }
}

export default Medication;
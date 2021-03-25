import React from 'react';

class SideEffects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.item.id,
            name: props.item.name
        }
    }

    render () {
        return (
            <div>
                - {this.state.name}
            </div>
        )
    }
}

export default SideEffects;
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddEditForm from './add-edit-form';

class ModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {

        const closeBtn = <button onClick={this.toggle}>Close</button>
        const btnLabel = this.props.buttonLabel;

        let button = '';
        let title = '';

        if(btnLabel === 'Edit') {
            button = <Button
                        color="warning"
                        onClick={this.toggle}>{btnLabel}
                     </Button>
            title = 'Edit patient';
        } else {
            button = <Button
                        color="success"
                        onClick={this.toggle}>{btnLabel}
                     </Button>
            title = 'Add new patient'
        }

        return (
            <div>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        <AddEditForm
                            addItemToState={this.props.addItemToState}
                            updateState={this.props.updateState}
                            toggle={this.toggle}
                            item={this.props.item}/>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default ModalForm;
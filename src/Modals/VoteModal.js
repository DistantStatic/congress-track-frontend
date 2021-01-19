import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap";

export default class VoteModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            "":""
        }
    }

    render() {
        const {toggle} = this.props
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader  toggle={toggle} >
                    <h1>VOTE</h1>
                </ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        )
    }
}
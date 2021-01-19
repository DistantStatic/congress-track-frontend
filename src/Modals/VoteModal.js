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
        state = {

        }
    }

    render = () => {
        return (
            <Modal>
                <ModalHeader>
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
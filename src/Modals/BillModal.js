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

export default class BillModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentBill: {
                ...props.currentBill
            },
        }
    }
    truncate = (str) =>{
        return str.length > 120 ? str.substring(0, 117) + "..." : str;
    }

    render = () => {
        const {toggle} = this.props
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader className={this.state.currentBill.sponsor_party + "party"} toggle={toggle}>
                    {this.state.currentBill.bill_id.toUpperCase() + " | " + (this.state.currentBill.active ? "Active" : "Inactive")}
                </ModalHeader>
                <ModalBody>
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>Title: </ListGroupItemHeading>
                            <ListGroupItemText>{this.state.currentBill.title}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Important Dates: </ListGroupItemHeading> 
                            <ListGroupItemText><i>Introduced: </i>{this.state.currentBill.introduced_date}</ListGroupItemText>
                            <ListGroupItemText><i>Lastest Action: </i>{this.state.currentBill.latest_major_action_date}</ListGroupItemText>
                            <ListGroupItemText>{this.state.currentBill.latest_major_action}</ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                            <ListGroupItemHeading>Sponsor(s): </ListGroupItemHeading>
                            <ListGroupItemText>{this.state.currentBill.sponsor_title + " " + this.state.currentBill.sponsor + " + " + this.state.currentBill.cosponsors}</ListGroupItemText>
                            { this.state.currentBill.cosponsors > 0 ? (
                               "D: " + (this.state.currentBill.cosponsors_by_party.D > 0 ? (this.state.currentBill.cosponsors_by_party.D): "0") +  
                               " | " + 
                               "R: " + (this.state.currentBill.cosponsors_by_party.R > 0 ? (this.state.currentBill.cosponsors_by_party.R): "0"))
                               : null 
                            }
                        </ListGroupItem>
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" href={this.state.currentBill.congressdotgov_url}>
                        Go to bill page
                    </Button>
                    <Button onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}
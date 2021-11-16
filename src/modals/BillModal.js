import React, { Component } from 'react';
import {
    Button,
    Modal,
    ListGroup,
} from "react-bootstrap";

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
        const { show, hide } = this.props
        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header className={this.state.currentBill.sponsor_party + "party"}>
                    {this.state.currentBill.bill_id.toUpperCase() + " | " + (this.state.currentBill.active ? "Active" : "Inactive")}
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Title: </h3>
                            <span>{this.state.currentBill.title}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Important Dates: </h3> 
                            <p><i>Introduced: </i>{this.state.currentBill.introduced_date}</p>
                            <p><i>Lastest Action: </i>{this.state.currentBill.latest_major_action_date}</p>
                            <p>{this.state.currentBill.latest_major_action}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Sponsor(s): </h3>
                            <p>{this.state.currentBill.sponsor_title + " " + this.state.currentBill.sponsor + " + " + this.state.currentBill.cosponsors}</p>
                            { this.state.currentBill.cosponsors > 0 ? (
                               "D: " + (this.state.currentBill.cosponsors_by_party.D > 0 ? (this.state.currentBill.cosponsors_by_party.D): "0") +  
                               " | " + 
                               "R: " + (this.state.currentBill.cosponsors_by_party.R > 0 ? (this.state.currentBill.cosponsors_by_party.R): "0"))
                               : null 
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="primary" href={this.state.currentBill.congressdotgov_url}>
                        Go to bill page
                    </Button>
                    <Button onClick={hide}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
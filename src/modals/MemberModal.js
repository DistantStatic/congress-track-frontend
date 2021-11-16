import React, { Component } from 'react';
import {
    Table,
    Button,
    Modal,
    ListGroup,
} from "react-bootstrap";

export default class MemberModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentMember: {
                ...props.currentMember
            },
        }
    }

    makeRoleList = (rlist) => {
        let ret = []
        rlist.forEach((entry, index) => {
            ret.push(<tr>
                <th scope="row">{entry.congress}</th>
                <td>{entry.chamber}</td>
                <td>{entry.bills_sponsored}</td>
                <td>{entry.bills_cosponsored}</td>
                <td>{entry.total_votes}</td>
                <td>{entry.missed_votes_pct + "%"}</td>
                <td>{entry.total_present}</td>
                <td>{entry.votes_with_party_pct + "%"}</td>
                <td>{entry.votes_against_party_pct + "%"}</td>
            </tr>)
        })
        return ret
    }

    makeCommitteeList = (clist) => {
        let ret = []
        clist.forEach((entry, index) => {
            ret.push(
                <li>{entry.name}</li>
            )
        })
        return ret
    }

    render() {
        const { show, hide } = this.props
        return (
            <Modal
                dialogClassName="cust-modal" 
                show={show} 
                onHide={hide}>
                <Modal.Header className={this.state.currentMember.roles[0].party + "party"}>
                    {this.state.currentMember.roles[0].title + " " + this.state.currentMember.first_name + " " + this.state.currentMember.last_name + " | " + this.state.currentMember.roles[0].party + " - " + this.state.currentMember.roles[0].state}
                    <Button variant="danger" onClick={hide} style={{paddingBottom: '0.5em'}}><span>x</span></Button>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {this.state.currentMember.roles[0].leadership_role != null ? 
                        <ListGroup.Item>
                            <h3>{this.state.currentMember.roles[0].leadership_role}</h3>
                        </ListGroup.Item>
                        : null}
                        <ListGroup.Item>
                            <h3>Actions in congress: </h3>
                            <div className="holds-table">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Congress #</th>
                                            <th>Chamber</th>
                                            <th>Bills Sponsored</th>
                                            <th>Bills Cosponsored</th>
                                            <th>Total Votes</th>
                                            <th>Missed Votes %</th>
                                            <th>Present Votes</th>
                                            <th>Votes With Party %</th>
                                            <th>Votes Against Party %</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.makeRoleList(this.state.currentMember.roles)}
                                    </tbody>
                                </Table>
                            </div>
                        </ListGroup.Item>
                        {this.state.currentMember.roles[0].committees.length > 0 ? <ListGroup.Item>
                            <h3>Committees: </h3>
                            <ListGroup>
                                {this.makeCommitteeList(this.state.currentMember.roles[0].committees)}
                            </ListGroup>
                        </ListGroup.Item> : null}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    {this.state.currentMember.url != null ? <Button color="secondary" href={this.state.currentMember.url} target="_blank">Gov Page</Button> : null}
                    {this.state.currentMember.facebook_account != null ? <Button color="primary" href={"https://www.facebook.com/" + this.state.currentMember.facebook_account} target="_blank">Facebook</Button> : null}
                    {this.state.currentMember.twitter_account != null ? <Button color="info" href={"https://www.twitter.com/" + this.state.currentMember.twitter_account} target="_blank">Twitter</Button> : null}
                    {this.state.currentMember.youtube_account != null ? <Button color="danger" href={"https://www.youtube.com/" + this.state.currentMember.youtube_account} target="_blank">YouTube</Button> : null}
                </Modal.Footer>
            </Modal>
        )
    }
}
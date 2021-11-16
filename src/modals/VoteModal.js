import React, { Component } from 'react';
import { backgrounds } from '../components/Votes/VoteCard/VoteCard'
import {
    Button,
    Modal,
    ListGroup,
} from "react-bootstrap";
import VotePie from '../components/Graphs/Votes/VotePie';

export default class VoteModal extends Component {

  makeChartData(vote) {
    let data = [
        {
          "id": 'Dem. Yes',
          "label": 'Dem. Yes: ' + vote.democratic.yes,
          "color": 'hsl(211deg 100% 50%)',
          "value": vote.democratic.yes
        },
        {
          "id": 'Dem. No',
          "label": 'Dem. No: ' + vote.democratic.no,
          "color": 'hsl(211deg 100% 50%)',
          "value": vote.democratic.no
        },
        {
          "id": 'Dem. No Vote or Present',
          "label": 'N/A|Present: ' + (vote.democratic.not_voting + vote.democratic.present),
          "color": 'hsl(211deg 100% 50%)',
          "value": vote.democratic.not_voting + vote.democratic.present
        },
        {
          "id": 'Rep. Yes',
          "label": 'Rep. Yes: ' + vote.republican.yes,
          "color": 'hsl(354deg 70% 54%)',
          "value": vote.republican.yes
        },
        {
          "id": 'Rep. No',
          "label": 'Rep. No: ' + vote.republican.no,
          "color": 'hsl(354deg 70% 54%)',
          "value": vote.republican.no
        },
        {
          "id": 'Rep. No Vote or Present',
          "label": 'N/A|Present ' + (vote.republican.not_voting + vote.republican.present),
          "color": 'hsl(354deg 70% 54%)',
          "value": vote.republican.not_voting + vote.republican.present
        },
        {
          "id": 'Ind. Yes',
          "label": 'Ind. Yes: ' + vote.independent.yes,
          "color": 'hsl(208deg 7% 46%)',
          "value": vote.independent.yes
        },
        {
          "id": 'Ind. No',
          "label": 'Ind. No: ' + vote.independent.no,
          "color": 'hsl(208deg 7% 46%)',
          "value": vote.independent.no
        },
        {
          "id": 'Ind. No Vote or Present',
          "label": 'N/A|Present: ' + (vote.independent.not_voting + vote.independent.present),
          "color": 'hsl(208deg 7% 46%)',
          "value": vote.independent.not_voting + vote.independent.present
        }
      ]
    return data
  }
  
  render() {
    const {vote, show, hide} = this.props
    return (
      <Modal
        dialogClassName="cust-modal"
        show={show}
        onHide={hide}>
        <Modal.Header className={"" + backgrounds[vote.result]} >
          VOTE: {vote.congress + " | " + vote.session + " - " + vote.roll_call + "  -  " + vote.question}
                    <Button variant="danger" onClick={hide}>X</Button>
        </Modal.Header>
        <Modal.Body>
        <VotePie vote={vote}/>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>
                <h3>
                      Details
                </h3>
                <p>
                    {"Date: " + vote.date + " - " + vote.time}
                </p>
                <p>
                    {"Result: " + vote.result}
                </p>
            </ListGroup.Item>
            <ListGroup.Item>
                <h3>
                    Text
                </h3>
                <p>
                {vote.description.length > 1 ? vote.description : vote.question_text}
                </p>
            </ListGroup.Item>
        </ListGroup>
        </Modal.Body>
        <Modal.Footer>
        <Button color="primary" href={vote.url}>
          Go to vote page
        </Button>
        <Button onClick={hide}>
          Cancel
        </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
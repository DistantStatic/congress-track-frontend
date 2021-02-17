import React, { Component } from 'react';
import { backgrounds } from '../components/Votes/VoteCard/VoteCard'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
} from "reactstrap";
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
    const {vote, toggle} = this.props
    console.log(vote);
    return (
      <Modal className="vote-modal" isOpen={true} toggle={toggle}>
        <ModalHeader className={"" + backgrounds[vote.result]}  toggle={toggle} >
          VOTE: {vote.congress + " | " + vote.session + " - " + vote.roll_call + "  -  " + vote.question}
        </ModalHeader>
        <ModalBody>
        <VotePie vote={vote}/>
        <ListGroup className="list-group-flush">
            <ListGroupItem>
                <ListGroupItemHeading>
                      Details
                </ListGroupItemHeading>
                <ListGroupItemText>
                    {"Date: " + vote.date + " - " + vote.time}
                </ListGroupItemText>
                <ListGroupItemText>
                    {"Result: " + vote.result}
                </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
                <ListGroupItemHeading>
                    Text
                </ListGroupItemHeading>
                <ListGroupItemText>
                {vote.description.length > 1 ? vote.description : vote.question_text}
                </ListGroupItemText>
            </ListGroupItem>
        </ListGroup>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" href={vote.url}>
          Go to vote page
        </Button>
        <Button onClick={toggle}>
          Cancel
        </Button>
        </ModalFooter>
      </Modal>
    )
  }
}
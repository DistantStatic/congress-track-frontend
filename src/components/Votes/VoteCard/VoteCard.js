import React, { Component } from 'react';
import {
    Button,
    Col,
    Card,
    CardBody,
    CardFooter,
    Container,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap";
import styles from './VoteCard.module.css';

export const backgrounds = {
  "Passed": "green-vote",
  "Agreed to": "green-vote",
  "Failed": "red-vote",
  "Motion Rejected": "red-vote",
  "Motion Agreed to": "green-vote",
  "Not Guilty": "red-vote",
  "Guilty": "green-vote",
  "Resolution Agreed to": "green-vote",
  "Resolution Rejected": "red-vote",
  "Concurrent Resolution Agreed to": "green-vote",
  "Concurrent Resolution Rejected": "red-vote",
  "Amendment Agreed to": "green-vote",
  "Amendment Rejected": "red-vote",
  "Nomination Confirmed": "green-vote",
  "Nomination Rejected": "red-vote",
  "Cloture Motion Agreed to": "green-vote",
  "Cloture on the Motion to Proceed Rejected": "red-vote"
}

export default class Vote extends Component {

  hasData(o) {
    return Object.keys(o).length > 0
  }

  truncate (str) {
    return str.length > 60 ? str.substring(0, 57) + "..." : str;
  }

  render(){
    let vote = this.props.vote
    return (
      <Col sm="12" md="6" lg="4" xl="2">
        <Card className={styles.card}>
          <div className={"card-header " + backgrounds[vote.result]}>{vote.congress + " | " + vote.session + " - " + vote.roll_call}</div>          
          <CardBody className="my-body">
            <Container>
              <ListGroup className="list-group-flush">
                <ListGroupItem className={styles.custList}>
                  <ListGroupItemHeading>
                  {vote.description.length > 1 ? this.truncate(vote.description) : this.truncate(vote.question_text)}
                  </ListGroupItemHeading>
                      { this.hasData(vote.bill) ? <ListGroupItemText>{vote.bill.number}</ListGroupItemText> : null }
                      { this.hasData(vote.amendment) ? <ListGroupItemText>{vote.amendment.number}</ListGroupItemText> : null }
                      <ListGroupItemText>{vote.question}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem className={styles.custList}>
                  <ListGroupItemHeading>
                    {"Total Votes"}
                  </ListGroupItemHeading>
                  <p>{"Yes: " + vote.total.yes + " | No: " + vote.total.no}</p> 
                  <p>{"Present: " + vote.total.present + " | Not Voting: " + vote.total.not_voting}</p>
                </ListGroupItem>
                <ListGroupItem className={styles.custList}>
                  {"Date: " + vote.date + " - " + vote.time}
                </ListGroupItem>
                <ListGroupItem className={styles.custList}>
                  {"Result: " + vote.result}
                </ListGroupItem>
              </ListGroup>
            </Container>
          </CardBody>
          <CardFooter>
            <Button onClick={this.props.setActiveVote.bind(this, vote)}>Find Out More</Button>
          </CardFooter>
        </Card>
      </Col>
    )
  }
}
import React, { Component } from 'react';
import {
    Button,
    Col,
    Card,
    Container,
    ListGroup,
} from "react-bootstrap";
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
          <Card.Body className="my-body">
            <Container>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className={styles.custList}>
                  <h3>
                  {vote.description.length > 1 ? this.truncate(vote.description) : this.truncate(vote.question_text)}
                  </h3>
                      { this.hasData(vote.bill) ? <p>{vote.bill.number}</p> : null }
                      { this.hasData(vote.amendment) ? <p>{vote.amendment.number}</p> : null }
                      <p>{vote.question}</p>
                </ListGroup.Item>
                <ListGroup.Item className={styles.custList}>
                  <h3>
                    {"Total Votes"}
                  </h3>
                  <p>{"Yes: " + vote.total.yes + " | No: " + vote.total.no}</p> 
                  <p>{"Present: " + vote.total.present + " | Not Voting: " + vote.total.not_voting}</p>
                </ListGroup.Item>
                <ListGroup.Item className={styles.custList}>
                  {"Date: " + vote.date + " - " + vote.time}
                </ListGroup.Item>
                <ListGroup.Item className={styles.custList}>
                  {"Result: " + vote.result}
                </ListGroup.Item>
              </ListGroup>
            </Container>
          </Card.Body>
          <Card.Footer>
            <Button onClick={this.props.setActiveVote.bind(this, vote)}>Find Out More</Button>
          </Card.Footer>
        </Card>
      </Col>
    )
  }
}
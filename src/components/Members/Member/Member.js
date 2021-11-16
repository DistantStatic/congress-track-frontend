import React, { Component } from 'react';
import {
  Button,
  Col,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import styles from './Member.module.css';

export default class Member extends Component {

  render(){
    let member = this.props.member
    return (
      <Col sm="12" md="6" lg="4" xl="2">
        <Card className={styles.card}>
          <div className={"card-header " + member.party + "party"}>{member.title + " | " + member.party + " - " + member.state}</div>
          <div className="card-title-section">
            <h1 className="card-title">{member.first_name}</h1>
            <h1 className="card-title">{member.last_name}</h1>
          </div>            
          <Card.Body className="my-body">
            <Container>
              <ListGroup variant="flush">
                <ListGroupItem className={styles.custList}>
                  {"Total Votes: " + member.total_votes + " | Missed: " + member.missed_votes + "(" + member.missed_votes_pct + "%)"}
                </ListGroupItem>
                <ListGroupItem className={styles.custList}>
                  {"Next Election: " + member.next_election}
                </ListGroupItem>
                <ListGroupItem className={styles.custList}>
                  {"Address: " + member.office}
                </ListGroupItem>
                <ListGroupItem className={styles.custList}>
                  {"Phone: " + member.phone}
                </ListGroupItem>
              </ListGroup>
            </Container>
          </Card.Body>
          <Card.Footer>
            <Button onClick={this.props.setActiveMember.bind(this, member)}>Find Out More</Button>
          </Card.Footer>
        </Card>
      </Col>
    )
  }
}
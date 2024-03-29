import React, { Component } from 'react';
import {
    Button,
    Col,
    Card,
    Container,
    ListGroup,
    ListGroupItem,
} from "react-bootstrap";
import styles from './Bill.module.css';

export default class Bill extends Component {

  truncate (str) {
    return str.length > 60 ? str.substring(0, 57) + "..." : str;
  }

  render(){
    let bill = this.props.bill
    return (
      <Col sm="12" md="6" lg="4" xl="2">
        <Card className={styles.card}>
          <div className={"card-header " + bill.sponsor_party + "party"}>{bill.bill_id.toUpperCase()}</div>
          <Card.Title>
            <span>{this.truncate(bill.short_title)}</span>
          </Card.Title>            
          <Card.Body className="my-body">
            <Container>
              <h5 className="card-title">{"Sponsor(s): " + bill.sponsor_name + " + " + bill.cosponsors}</h5>
              <ListGroup variant="flush">
                <ListGroupItem className={styles.custList}><a href={bill.congressdotgov_url}>{bill.congressdotgov_url}</a></ListGroupItem>
                <ListGroupItem className={styles.custList}>{"Last Major Action Date: " + bill.latest_major_action_date}</ListGroupItem>
              </ListGroup>
            </Container>
          </Card.Body>
          <Card.Footer>
            <Button onClick={this.props.setActiveBill.bind(this, bill)}>Find Out More</Button>
          </Card.Footer>
        </Card>
      </Col>
    )
  }
}
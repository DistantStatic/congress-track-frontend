import React, { Component } from 'react';
import {
    Button,
    Col,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Container,
    ListGroup,
    ListGroupItem,
} from "reactstrap";

export default class Bill extends Component {

  truncate (str) {
    return str.length > 60 ? str.substring(0, 57) + "..." : str;
  }

  render(){
    let bill = this.props.bill
    return (
      <Col sm="12" md="6" lg="4" xl="2">
        <Card>
          <div className={"card-header " + bill.sponsor_party + "party"}>{bill.bill_id.toUpperCase()}</div>
          <CardTitle>
            <h3>{this.truncate(bill.short_title)}</h3>
          </CardTitle>            
          <CardBody className="my-body">
            <Container>
              <h5 className="card-title">{"Sponsor(s): " + bill.sponsor_name + " + " + bill.cosponsors}</h5>
              <ListGroup className="list-group-flush">
                <ListGroupItem><a href={bill.congressdotgov_url}>{bill.congressdotgov_url}</a></ListGroupItem>
                <ListGroupItem>{"Last Major Action Date: " + bill.latest_major_action_date}</ListGroupItem>
              </ListGroup>
            </Container>
          </CardBody>
          <CardFooter>
            <Button onClick={this.props.setActiveBill.bind(this, bill)}>Find Out More</Button>
          </CardFooter>
        </Card>
      </Col>
    )
  }
}
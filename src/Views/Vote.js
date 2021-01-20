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

export const backgrounds = {
  "Passed": "green-vote",
  "Agreed to": "green-vote",
  "Failed": "red-vote",
  "Motion Rejected": "red-vote"
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
        <Card>
          <div className={"card-header " + backgrounds[vote.result]}>{vote.congress + " | " + vote.session + " - " + vote.roll_call}</div>          
          <CardBody className="my-body">
            <Container>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <ListGroupItemHeading>
                    {this.truncate(vote.description)}
                  </ListGroupItemHeading>
                      { this.hasData(vote.bill) ? <ListGroupItemText>{vote.bill.number}</ListGroupItemText> : null }
                      { this.hasData(vote.amendment) ? <ListGroupItemText>{vote.amendment.number}</ListGroupItemText> : null }
                      <ListGroupItemText>{vote.question}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>
                    {"Total Votes"}
                  </ListGroupItemHeading>
                  <p>{"Yes: " + vote.total.yes + " | No: " + vote.total.no}</p> 
                  <p>{"Present: " + vote.total.present + " | Not Voting: " + vote.total.not_voting}</p>
                </ListGroupItem>
                <ListGroupItem>
                  {"Date: " + vote.date + " - " + vote.time}
                </ListGroupItem>
                <ListGroupItem>
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
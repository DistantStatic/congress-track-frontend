import React, { Component } from 'react';

export default class VoteView extends Component {

  render = () => {
    let voteList = this.props.voteList
    let toRender = [];
      voteList.forEach((member) => {
        toRender.push(
          <Col sm="12" md="6" lg="4" xl="2">
          <Card>
            <div className={"card-header " + member.party + "party"}>{member.title + " | " + member.party + " - " + member.state}</div>
            <div className="card-title-section">
              <h1 className="card-title">{member.first_name}</h1>
              <h1 className="card-title">{member.last_name}</h1>
            </div>            
            <CardBody className="my-body">
              <Container>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    {"Total Votes: " + member.total_votes + " | Missed: " + member.missed_votes + "(" + member.missed_votes_pct + "%)"}
                  </ListGroupItem>
                  <ListGroupItem>
                    {"Next Election: " + member.next_election}
                  </ListGroupItem>
                  <ListGroupItem>
                    {"Address: " + member.office}
                  </ListGroupItem>
                  <ListGroupItem>
                    {"Phone: " + member.phone}
                  </ListGroupItem>
                </ListGroup>
              </Container>
            </CardBody>
            <CardFooter>
              <Button onClick={this.setActiveMember.bind(this, member)}>Find Out More</Button>
            </CardFooter>
          </Card>
        </Col>
        )
      })
    return toRender
  }
}
import './App.css';
import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BillModal from './BillModal';
import MemberModal from './MemberModal';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

const BASE_URL = process.env.REACT_APP_BASE_URL

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      senateMembers: [],
      houseMembers: [],
      bills: [],
      pages: {
        senate: true,
        house: false,
        bills: false,
      },
      activeMember: {},
      activeBill: {},
      billModal: false,
      memberModal: false,
    }
  }

  componentDidMount = () => {
    this.getSenateMemberData();
    this.getHouseMemberData();
    this.getBillData();
  }

  truncate = (str) =>{
    return str.length > 60 ? str.substring(0, 57) + "..." : str;
}

  setActiveMember = (member) => {
    this.getDetailedMemberData(member.id)
  }

  setActiveBill = (bill) => {
    this.getDetailedBillData(bill.bill_slug)
  }

  getSenateMemberData = () => {
    axios({
      method: 'get', //you can set what request you want to be
      url: BASE_URL + '/api/senate',
      data: {},
    }).then((response) =>{
        this.setState({senateMembers: response.data.results[0].members})
    })
  }

  getHouseMemberData = () => {
    axios({
      method: 'get', //you can set what request you want to be
      url: BASE_URL + '/api/house',
      data: {},
    }).then((response) =>{
        this.setState({houseMembers: response.data.results[0].members})
    })
  }

  getBillData = () => {
    axios({
      method: 'get', //you can set what request you want to be
      url: BASE_URL + '/api/bills',
      data: {},
    }).then((response) =>{
      this.setState({bills: response.data.results[0].bills})
    })
  }

  getDetailedMemberData = (mlink) => {
    axios({
      method: 'get', //you can set what request you want to be
      url: BASE_URL + '/api/member/' + mlink,
      data: {},
    }).then((response) =>{
        this.setState({memberModal: true, activeMember: response.data.results[0]})
    })
  }

  getDetailedBillData = (blink) => {
    axios({
      method: 'get', //you can set what request you want to be
      url: BASE_URL + '/api/bills/' + blink,
      data: {},
    }).then((response) =>{
        this.setState({billModal: true, activeBill: response.data.results[0]})
    })
  }

  renderBills = (billList) => {
    let toRender = [];
    billList.forEach((bill) => {
      toRender.push(
        <div className="col-sm-4">
        <Card>
          <div className={"card-header " + bill.sponsor_party + "party"}>{bill.bill_id.toUpperCase()}</div>
          <CardTitle>
            <h3>{this.truncate(bill.short_title)}</h3>
          </CardTitle>            
          <CardBody className="my-body">
            <div className="container">
            <h5 className="card-title">{"Sponsor(s): " + bill.sponsor_name + " + " + bill.cosponsors}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><a href={bill.congressdotgov_url}>{bill.congressdotgov_url}</a></li>
              <li className="list-group-item">{"Last Major Action Date: " + bill.latest_major_action_date}</li>
            </ul>
            </div>
          </CardBody>
          <CardFooter>
            <Button onClick={this.setActiveBill.bind(this, bill)}>Find Out More</Button>
          </CardFooter>
        </Card>
      </div>
      )
    })
    return (toRender)
  }

  renderCongressMembers = (memberList) => {
    let toRender = [];
    memberList.forEach((member) => {
      toRender.push(
      <div className="col-sm-4">
        <Card>
          <div className={"card-header " + member.party + "party"}>{member.title + " | " + member.party + " - " + member.state}</div>
          <div className="card-title-section">
            <h1 className="card-title">{member.first_name}</h1>
            <h1 className="card-title">{member.last_name}</h1>
          </div>            
          <CardBody className="my-body">
            <div className="container">
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
            </div>
          </CardBody>
          <CardFooter>
            <Button onClick={this.setActiveMember.bind(this, member)}>Find Out More</Button>
          </CardFooter>
        </Card>
      </div>
      )
    })
    return toRender
  }

  displaySenate = () => {
    this.setState({pages: {house: false, senate: true, bills: false}})
  }
  
  displayHouse = () => {
    this.setState({pages: {house: true, senate: false, bills: false}})
  }

  displayBills = () => {
    this.setState({pages: {house: false, senate: false, bills: true}})
  }

  dataDecider = () => {
    return (
      <ul className="nav">
        <li className="nav-item">
          <a onClick={this.displaySenate} className={"nav-link " + ( this.state.pages.senate ? "active" : "")} href="#">Senate</a>
        </li>
        <li className="nav-item">
          <a onClick={this.displayHouse} className={"nav-link " + ( this.state.pages.house ? "active" : "")} href="#">House</a>
        </li>
        <li className="nav-item">
          <a onClick={this.displayBills} className={"nav-link " + ( this.state.pages.bills ? "active" : "")} href="#">Bills</a>
        </li>
      </ul>
    )
  }

  toggleBillModal = () => {
    this.setState({billModal: !this.state.billModal})
  }

  toggleMemberModal = () => {
    this.setState({memberModal: !this.state.memberModal})
  }

  render = () => {
    return (
      <div className="App">
        <div className="header">
          <h1 className="title site-title">TrackUS</h1>
          <h5 className="title sub-title text-muted">Keep track of your Representatives in Washington</h5>
        </div>
        <div className="container">
          <div className="main-display scroll-test row">
                {this.state.pages.senate ? this.renderCongressMembers(this.state.senateMembers) : ""}
                {this.state.pages.house ? this.renderCongressMembers(this.state.houseMembers) : ""}
                {this.state.pages.bills ? this.renderBills(this.state.bills) : ""}
          </div>
        </div>
          <div className="my-footer">
            {this.dataDecider()}
          </div>
          { this.state.memberModal ? (<MemberModal currentMember={this.state.activeMember} toggle={this.toggleMemberModal}/>) : null }
          { this.state.billModal ? (<BillModal currentBill={this.state.activeBill} toggle={this.toggleBillModal}/>) : null }
      </div>

    );
  }
}
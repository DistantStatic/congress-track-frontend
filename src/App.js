import './App.css';
import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BillModal from './BillModal';
import MemberModal from './MemberModal';
import LoadingComp from './LoadingComp';
import * as JsSearch from 'js-search';
import {
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Container,
  Nav,
  Navbar,
  NavLink,
  NavbarBrand,
  NavbarText,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input
} from 'reactstrap';

const BASE_URL = process.env.REACT_APP_BASE_URL

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      senateMembers: [],
      renderSenateMembers: [],
      houseMembers: [],
      renderHouseMembers: [],
      bills: [],
      renderBills: [],
      pages: {
        senate: true,
        house: false,
        bills: false,
      },
      activeMember: {},
      activeBill: {},
      billModal: false,
      memberModal: false,
      searchSenate: new JsSearch.Search("last_name"),
      searchHouse: new JsSearch.Search("last_name"),
      searchBills: new JsSearch.Search("bill_slug")
    }
    this.state.searchHouse.addIndex("first_name")
    
    this.state.searchHouse.addDocuments(this.state.houseMembers)
    this.state.searchBills.addDocuments(this.state.bills)
  }

  componentDidMount = () => {
    this.getSenateMemberData();
    this.getHouseMemberData();
    this.getBillData();
  }

  truncate = (str) =>{
    return str.length > 60 ? str.substring(0, 57) + "..." : str;
  }

  handleChange = (e) => {
    let { value } = e.target;
    if (this.state.pages.senate) {this.searchSenateMember(value)}
    if (this.state.pages.house) {this.searchHouseMember(value)}
    if (this.state.pages.bills) {this.searchBills(value)}
  };

  searchSenateMember = (a) => {
    this.state.searchSenate.addDocuments(this.state.senateMembers)
    this.state.searchSenate.addIndex("first_name")
    this.state.searchSenate.addIndex("last_name")
    let result = this.state.searchSenate.search(a)
    if (result.length < 1 ) {
      result = this.state.senateMembers
    }
    this.setState({renderSenateMembers: result})
  }

  searchHouseMember = (a) => {
    this.state.searchHouse.addDocuments(this.state.houseMembers)
    this.state.searchHouse.addIndex("first_name")
    this.state.searchHouse.addIndex("last_name")
    let result = this.state.searchHouse.search(a)
    this.setState({renderHouseMembers: result})
  }
  
  searchBills = (a) => {
    this.state.searchBills.addDocuments(this.state.bills)
    this.state.searchBills.addIndex("title")
    this.state.searchBills.addIndex("bill_slug")
    let result = this.state.searchBills.search(a)
    this.setState({renderBills: result})
  }

  setActiveMember = (member) => {
    this.setState({loading: true})
    this.getDetailedMemberData(member.id)
  }

  setActiveBill = (bill) => {
    this.setState({loading: true})
    this.getDetailedBillData(bill.bill_slug)
  }

  getSenateMemberData = () => {
    axios({
      method: 'get',
      url: BASE_URL + '/api/senate',
    }).then((response) =>{
        this.setState({senateMembers: response.data.results[0].members})
    })
  }

  getHouseMemberData = () => {
    axios({
      method: 'get', 
      url: BASE_URL + '/api/house',
    }).then((response) =>{
        this.setState({houseMembers: response.data.results[0].members})
    })
  }

  getBillData = () => {
    axios({
      method: 'get',
      url: BASE_URL + '/api/bills',
    }).then((response) =>{
      this.setState({loading: false, bills: response.data.results[0].bills})
    })
  }

  getDetailedMemberData = (mlink) => {
    axios({
      method: 'get',
      url: BASE_URL + '/api/member/' + mlink,
    }).then((response) =>{
        this.setState({loading: false, memberModal: true, activeMember: response.data.results[0]})
    })
  }

  getDetailedBillData = (blink) => {
    axios({
      method: 'get',
      url: BASE_URL + '/api/bills/' + blink,
    }).then((response) =>{
        this.setState({loading: false, billModal: true, activeBill: response.data.results[0]})
    })
  }

  renderBills = (billList) => {
    let toRender = [];
    billList.forEach((bill) => {
      toRender.push(
        <Col sm="2">
        <Card>
          <div className={"card-header " + bill.sponsor_party + "party"}>{bill.bill_id.toUpperCase()}</div>
          <CardTitle>
            <h3>{this.truncate(bill.short_title)}</h3>
          </CardTitle>            
          <CardBody className="my-body">
            <Container>
            <h5 className="card-title">{"Sponsor(s): " + bill.sponsor_name + " + " + bill.cosponsors}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><a href={bill.congressdotgov_url}>{bill.congressdotgov_url}</a></li>
              <li className="list-group-item">{"Last Major Action Date: " + bill.latest_major_action_date}</li>
            </ul>
            </Container>
          </CardBody>
          <CardFooter>
            <Button onClick={this.setActiveBill.bind(this, bill)}>Find Out More</Button>
          </CardFooter>
        </Card>
      </Col>
      )
    })
    return (toRender)
  }

  renderCongressMembers = (memberList) => {
    let toRender = [];
    memberList.forEach((member) => {
      toRender.push(
      <Col sm="2">
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
      <Navbar light expand="sm">
        <Nav navbar className="my-nav">
          <NavItem>
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              { this.state.pages.house ? "House": null }
              { this.state.pages.senate ? "Senate": null }
              { this.state.pages.bills ? "Bills": null }
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.displaySenate}>
                Senate
              </DropdownItem>
              <DropdownItem onClick={this.displayHouse}>
                House
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.displayBills}>
                Bills
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </NavItem>
          <NavItem>
            <Input
              type="text"
              autoComplete="off"
              name="search-bar"
              onKeyUp={this.handleChange}
              placeholder="Search..."
            />
          </NavItem>
        </Nav>
      </Navbar>
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
        {this.state.loading ? <LoadingComp /> : null}
        <div className="header">
          <h1 className="title site-title">TrackUS</h1>
          <h5 className="title sub-title text-muted">Keep track of your Representatives in Washington</h5>
          <div>
            {this.dataDecider()}
          </div>
        </div>
        <div className="main-display scroll-test row">
          {this.state.pages.senate ? this.state.renderSenateMembers.length > 0 ? this.renderCongressMembers(this.state.renderSenateMembers) : this.renderCongressMembers(this.state.senateMembers) : null}
          {this.state.pages.house ? this.state.renderSenateMembers.length > 0 ? this.renderCongressMembers(this.state.renderHouseMembers) :  this.renderCongressMembers(this.state.houseMembers) : null}
          {this.state.pages.bills ? (this.state.renderBills.length > 0 ? this.renderBills(this.state.renderBills) : this.renderBills(this.state.bills)) : null}
        </div>
        <div className="footer">
          <span>Data sourced from ProPublica</span>
        </div>
          { this.state.memberModal ? (<MemberModal currentMember={this.state.activeMember} toggle={this.toggleMemberModal}/>) : null }
          { this.state.billModal ? (<BillModal currentBill={this.state.activeBill} toggle={this.toggleBillModal}/>) : null }
      </div>

    );
  }
}
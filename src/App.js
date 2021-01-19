import './App.css';
import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberView from './Views/MembersView';
import BillView from './Views/BillsView';
import BillModal from './Modals/BillModal';
import MemberModal from './Modals/MemberModal';
import LoadingComp from './Utility/LoadingComp';
import * as JsSearch from 'js-search';
import {
  Nav,
  Navbar,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
          {this.state.pages.senate ?  
            <MemberView 
              memberList={this.state.renderSenateMembers.length > 0 ? this.state.renderSenateMembers : this.state.senateMembers} 
              setActiveMember = {this.setActiveMember}
              />
            : null}
          {this.state.pages.house ?  
            <MemberView 
              memberList={this.state.renderHouseMembers.length > 0 ? this.state.renderHouseMembers : this.state.HouseMembers} 
              setActiveMember = {this.setActiveMember}
              />
            : null}
          {this.state.pages.bills ?  
            <BillView 
              billList={this.state.renderBills.length > 0 ? this.state.renderBills : this.state.bills} 
              setActiveBill = {this.setActiveBill}
              />
            : null}
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
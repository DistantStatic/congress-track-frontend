import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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

import BillsView from './containers/Bills/BillsView';
import VotesView from './containers/Votes/VotesView';
import HouseView from './containers/House/HouseView';
import SenateView from './containers/Senate/SenateView';

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
	  	votes: [],
	  	renderVotes: [],
	  	pages: {
			senate: true,
			house: false,
			bills: false,
			votes: false,
	  	},
	  	activeMember: {},
	  	activeBill: {},
	  	activeVote: {},
	  	billModal: false,
	  	memberModal: false,
	  	voteModal: false,
	  	searchSenate: new JsSearch.Search("last_name"),
	  	searchHouse: new JsSearch.Search("last_name"),
	  	searchBills: new JsSearch.Search("bill_slug"),
	  	searchVotes: new JsSearch.Search("description")
	}
	this.state.searchHouse.addIndex("first_name")
	
	this.state.searchHouse.addDocuments(this.state.houseMembers)
	this.state.searchBills.addDocuments(this.state.bills)
  }

  componentDidMount() {
  }

  handleChange = (e) => {
	let { value } = e.target;
	if (this.state.pages.senate) {this.searchSenateMember(value)}
	if (this.state.pages.house) {this.searchHouseMember(value)}
	if (this.state.pages.bills) {this.searchBills(value)}
	if (this.state.pages.votes) {this.searchVotes(value)}
  };

  searchSenateMember(a) {
	this.state.searchSenate.addDocuments(this.state.senateMembers)
	this.state.searchSenate.addIndex("first_name")
	this.state.searchSenate.addIndex("last_name")
	let result = this.state.searchSenate.search(a)
	if (result.length < 1 ) {
	  result = this.state.senateMembers
	}
	this.setState({renderSenateMembers: result})
  }

  searchHouseMember(a) {
	this.state.searchHouse.addDocuments(this.state.houseMembers)
	this.state.searchHouse.addIndex("first_name")
	this.state.searchHouse.addIndex("last_name")
	let result = this.state.searchHouse.search(a)
	this.setState({renderHouseMembers: result})
  }
  
  searchBills(a) {
	this.state.searchBills.addDocuments(this.state.bills)
	this.state.searchBills.addIndex("title")
	this.state.searchBills.addIndex("bill_slug")
	let result = this.state.searchBills.search(a)
	this.setState({renderBills: result})
  }

  searchVotes(a) {
	this.state.searchVotes.addDocuments(this.state.votes)
	this.state.searchVotes.addIndex("description")
	let result = this.state.searchVotes.search(a)
	this.setState({renderVotes: result})
  }

  displaySenate() {
	this.setState({pages: {house: false, senate: true, bills: false, votes: false}})
  }
  
  displayHouse() {
	this.setState({pages: {house: true, senate: false, bills: false, votes: false}})
  }

  displayBills() {
	this.setState({pages: {house: false, senate: false, bills: true, votes: false}})
  }

  displayVotes() {
	this.setState({pages: {house: false, senate: false, bills: false, votes: true}})
  }

  dataDecider() {
	return (
	  <Navbar light expand="sm">
		<Nav navbar className="my-nav">
		  <NavItem>
		  <UncontrolledDropdown>
			<DropdownToggle nav caret>
			  { this.state.pages.house ? "House": null }
			  { this.state.pages.senate ? "Senate": null }
			  { this.state.pages.bills ? "Recent Bills ": null }
			  { this.state.pages.votes ? "Recent Votes ": null }
			</DropdownToggle>
			<DropdownMenu right>
			  <DropdownItem onClick={this.displaySenate.bind(this)}>
				Senate
			  </DropdownItem>
			  <DropdownItem onClick={this.displayHouse.bind(this)}>
				House
			  </DropdownItem>
			  <DropdownItem divider />
			  <DropdownItem onClick={this.displayBills.bind(this)}>
				Recent Bills
			  </DropdownItem>
			  <DropdownItem onClick={this.displayVotes.bind(this)}>
				Recent Votes
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

  render() {
	return (
	  <div className="App">
		<div className="header">
		  <h1 className="title site-title">TrackUS</h1>
		  <h5 className="title sub-title text-muted">Keep track of your Representatives in Washington</h5>
		  <div>
			{this.dataDecider()}
		  </div>
		</div>
		<div className="main-display scroll-test row">
		  {this.state.pages.senate ?  
			<SenateView/>
			: null}
		  {this.state.pages.house ?  
			<HouseView />
			: null}
		  {this.state.pages.bills ?  
			<BillsView />
			: null}
		  {this.state.pages.votes ?  
			<VotesView />
			: null}
			{/*
			<Route path="/" component={MembersView} />
			<Route path="/senate" component={MembersView} />
			<Route path="/house" component={MembersView} />
			<Route path="/bills" component={BillsView} />
			<Route path="/votes" component={VotesView} />
			*/}
		</div>
		<div className="footer">
		  <span>Data sourced from ProPublica</span>
		</div>
	  </div>

	);
  }
}
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
import { BrowserRouter, Route } from 'react-router-dom';

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

  render() {
	return (
	  <div className="App">
		  	<BrowserRouter>
				<Route path="/" exact component={SenateView} />
				<Route path="/senate" component={SenateView} />
				<Route path="/house" component={HouseView} />
				<Route path="/bills" component={BillsView} />
				<Route path="/votes" component={VotesView} />
			</BrowserRouter>
		<div className="footer">
		  <span>Data sourced from ProPublica</span>
		</div>
	  </div>

	);
  }
}
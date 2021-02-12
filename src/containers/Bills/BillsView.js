import { Component } from 'react';

import BillList from '../../components/Bills/Bills';
import BillModal from '../../modals/BillModal';
import Navigation from '../../utility/Navigation/Navigation';
import Aux from '../../hoc/Aux';

import axios from '../../axios-instances/axios-backend';

import * as JsSearch from 'js-search';


class BillsView extends Component {

    state = {
		activeBill: {},
		bills: [],
		billModal: false,
		loading: false,
		searchList: [],
		searchBills: new JsSearch.Search("bill_slug"),
    }

    componentDidMount() {
		this.getBillData();
    }

	setActiveBill = (bill) => {
		this.setState({loading: true})
		this.getDetailedBillData(bill.bill_slug)
	}

	getBillData = () => {
		if (this.state.loading !== true){ this.setState({loading: true})}
		axios({
		  	method: 'get',
		  	url: '/api/bills',
		}).then((response) =>{
		  	this.setState({loading: false, bills: response.data.results[0].bills})
		})
	}
	
	getDetailedBillData = (blink) => {
		if (this.state.loading !== true){ this.setState({loading: true})}
		axios({
		  	method: 'get',
		  	url: '/api/bills/' + blink,
		}).then((response) =>{
			this.setState({loading: false, billModal: true, activeBill: response.data.results[0]})
		})
	}

	toggleBillModal = () => {
		this.setState({billModal: !this.state.billModal})
	}
  
	searchBills = (a) => {
		const search = this.state.searchBills
	  	search.addDocuments(this.state.bills)
	  	search.searchBills.addIndex("title")
	  	search.searchBills.addIndex("bill_slug")
	  	const result = search.search(a)
	  	this.setState({searchList: result})
	}

    render() {
        return (
			<Aux>
				<Navigation
					page="Bills"
					search={this.searchBills}
					/>
				{ this.state.billModal ? 
				<BillModal 
					currentBill={this.state.activeBill} 
					toggle={this.toggleBillModal}
					/> 
				: null }
				<BillList
					billList={this.state.searchList.length ? this.state.searchList : this.state.bills}
					setActiveBill={this.setActiveBill}
					/>
			</Aux>
		)
    }
}

export default BillsView;
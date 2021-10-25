import { Component } from 'react';

import BillList from '../../components/Bills/Bills';
import BillModal from '../../modals/BillModal';
import Navigation from '../../utility/Navigation/Navigation';
import Loading from '../../utility/Loading/LoadingComp';

import axios from '../../axios-instances/axios-backend';

import * as JsSearch from 'js-search';


class BillsView extends Component {

    state = {
		activeBill: {},
		bills: [],
		billModal: false,
		loading: false,
		searchList: null,
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
	  	search.addIndex("title")
	  	search.addIndex("bill_slug")
		let result = search.search(a)
		if (result.length < 1 ) {
			result = this.state.senateMembers
		}
	  	this.setState({searchList: result})
	}

    render() {
        return (
			<>
				{!this.state.bills.length ? <Loading /> : null}
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
                <div className="main-display scroll-test row">
					<BillList
						billList={this.state.searchList ? 
									this.state.searchList : 
									this.state.bills}
						setActiveBill={this.setActiveBill}
						/>
				</div>
			</>
		)
    }
}

export default BillsView;
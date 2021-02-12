import React, { Component } from 'react';
import Bill from './Bill/Bill';

class BillsView extends Component {

  	shouldComponentUpdate(nextProps, _) {
    	return this.props.billList !== nextProps.billList
  	}
  
  	truncate (str) {
    	return str.length > 60 ? str.substring(0, 57) + "..." : str;
  	}

  	render() {
    	const billList = this.props.billList
    	return billList.map((bill) => (
        	<Bill 
          		key={bill.bill_id} 
          		bill={bill} 
          		setActiveBill={this.props.setActiveBill}
        	/>
		))
 	}
}

export default BillsView
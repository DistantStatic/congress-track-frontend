import React, { Component } from 'react';
import Bill from './Bill';

export default class BillView extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.billList !== nextProps.billList
  }

  componentDidMount() {
    if (this.props.billList.length < 1){
      this.props.getBillData()
    }
  }
  
  truncate (str) {
    return str.length > 60 ? str.substring(0, 57) + "..." : str;
  }

  render() {
    let billList = this.props.billList   
    let toRender = [];
    billList.forEach((bill) => {
      toRender.push(
        <Bill 
          key={bill.bill_id} 
          bill={bill} 
          setActiveBill={this.props.setActiveBill}
        />
      )
    })
    return (toRender)
  }
}
import React, { Component } from 'react';
import Member from './Member';

export default class MembersView extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.memberList !== nextProps.memberList
  }

  componentDidMount() {
    if (this.props.memberList.length < 1){
      this.props.getMemberData()
    }
  }

  render() {
    let memberList = this.props.memberList
    let toRender = [];
    memberList.forEach((member) => {
      toRender.push(
        <Member 
         key= {member.id}
         member={member}
         setActiveMember={this.props.setActiveMember}
        />
      )
    })
    return toRender
  }
}
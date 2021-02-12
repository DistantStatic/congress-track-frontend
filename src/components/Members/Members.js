import React, { Component } from 'react';
import Member from './Member/Member';

class MembersList extends Component {

	shouldComponentUpdate(nextProps, _) {
		return this.props.memberList !== nextProps.memberList
	}

	render() {
		const memberList = this.props.memberList
		return memberList.map((member) => (
			<Member 
				 key= {member.id}
				 member={member}
				 setActiveMember={this.props.setActiveMember}
			/>
		))
	}
}

export default MembersList
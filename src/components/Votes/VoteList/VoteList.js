import React, { Component } from 'react';
import VoteCard from '../VoteCard/VoteCard';

export default class VoteView extends Component {

  	shouldComponentUpdate(nextProps, _) {
    	return this.props.voteList !== nextProps.voteList
  	}

  	render() {
    	const voteList = this.props.voteList
      	return voteList.map((vote) => (
        	<VoteCard
				key={`${vote.congress}-${vote.session}-${vote.roll_call}`}
            	setActiveVote={this.props.setActiveVote}
            	vote={vote}
          	/>
		))
    	
  	}
}
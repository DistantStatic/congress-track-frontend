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
            	setActiveVote={this.props.setActiveVote}
            	vote={vote}
          	/>
		))
    	
  	}
}
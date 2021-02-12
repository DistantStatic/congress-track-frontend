import React, { Component } from 'react';
import Vote from './Vote/Vote';

export default class VoteView extends Component {

  	shouldComponentUpdate(nextProps, _) {
    	return this.props.voteList !== nextProps.voteList
  	}

  	render() {
    	const voteList = this.props.voteList
      	return voteList.map((vote) => (
        	<Vote
            	setActiveVote={this.props.setActiveVote}
            	vote={vote}
          	/>
		))
    	
  	}
}
import React, { Component } from 'react';
import Vote from './Vote/Vote';

export default class VoteView extends Component {

  	shouldComponentUpdate(nextProps, nextState) {
    	return this.props.voteList !== nextProps.voteList
  	}

  	componentDidMount() {
    	if (this.props.voteList.length < 1){
      	this.props.getVoteData()
    	}
  	}

  	render() {
    	const voteList = this.props.voteList
      	return voteList.map((vote) => {
        	<Vote
            	setActiveVote={this.props.setActiveVote}
            	vote={vote}
          	/>
      	})
    	
  	}
}
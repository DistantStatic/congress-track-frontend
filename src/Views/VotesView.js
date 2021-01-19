import React, { Component } from 'react';
import Vote from './Vote';

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
    let voteList = this.props.voteList
    let toRender = [];
      voteList.forEach((vote) => {
        toRender.push(
          <Vote
            key={vote.id}
            setActiveVote={this.props.setActiveVote}
            vote={vote}
          />
        )
      })
    return toRender
  }
}
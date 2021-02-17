import { Component } from 'react';

import VoteList from '../../components/Votes/VoteList/VoteList';
import VoteModal from '../../modals/VoteModal';
import Navigation from '../../utility/Navigation/Navigation';
import Loading from '../../utility/Loading/LoadingComp';
import Aux from '../../hoc/Aux';

import axios from '../../axios-instances/axios-backend';

import * as JsSearch from 'js-search';

class VotesView extends Component {
    
    state = {
        votes: [],
        activeVote: {},
        voteModal: false,
        loading: false,
        searchList: null,
        searchVotes: new JsSearch.Search("description")
    }

    componentDidMount() {
        this.getVoteData();
    }

    setActiveVote = (vote) => {
        this.setState({loading: true})
        this.getDetailedVoteData(vote.congress, vote.chamber, vote.session, vote.roll_call)
    }

    getVoteData = () => {
        if (this.state.loading !== true){ this.setState({loading: true})}
        axios({
            method: 'get',
            url: '/api/votes',
        }).then((response) =>{
            this.setState({loading: false, votes: response.data.results.votes})
        })
    }

    getDetailedVoteData = (congress, chamber, session, roll_call) => {
        if (this.state.loading !== true){ this.setState({loading: true})}
        axios({
            method: 'get',
            url: '/api/votes/' + congress + '/' + chamber + '/' + session + '/' + roll_call,
        }).then((response) =>{
            this.setState({loading: false, voteModal: true, activeVote: response.data.results.votes.vote})
        })
    }

    toggleVoteModal = () => {
        this.setState({voteModal: !this.state.voteModal})
    }

    searchVotes = (a) => {
        const search = this.state.searchVotes
        search.addDocuments(this.state.votes)
        search.addIndex("description")
        const result = search.search(a)
        this.setState({searchList: result})
    }

    render() {
        return (
            <Aux>
                {!this.state.votes.length ? <Loading /> : null}
                <Navigation
                    page="Votes"
                    search={this.searchVotes}
                    />
                { this.state.voteModal ? 
			    <VoteModal 
			        vote={this.state.activeVote} 
			        toggle={this.toggleVoteModal}
			        /> 
			    : null }
                <div className="main-display scroll-test row">
                    <VoteList
                        voteList={this.state.searchList ? 
                                    this.state.searchList : 
                                    this.state.votes}
                        setActiveVote={this.setActiveVote}
                        />
                </div>
            </Aux>
        )
    }

}

export default VotesView;
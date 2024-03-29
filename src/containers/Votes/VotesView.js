import { Component } from 'react';

import VoteList from '../../components/Votes/VoteList/VoteList';
import VoteModal from '../../modals/VoteModal';
import Navigation from '../../utility/Navigation/Navigation';
import Loading from '../../utility/Loading/LoadingComp';

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

    hideVoteModal = () => {
        this.setState({voteModal: false})
    }

    searchVotes = (a) => {
        const search = this.state.searchVotes
        search.addDocuments(this.state.votes)
        search.addIndex("description")
        let result = search.search(a)
        if (result.length < 1 ) {
            result = this.state.senateMembers
        }
        this.setState({searchList: result})
    }

    render() {
        return (
            <>
                {this.state.loading ? <Loading /> : null}
                <Navigation
                    page="Votes"
                    search={this.searchVotes}
                    />
                { this.state.voteModal ? 
			    <VoteModal 
			        vote={this.state.activeVote}
                    show={this.state.voteModal}
                    hide={this.hideVoteModal}
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
            </>
        )
    }

}

export default VotesView;
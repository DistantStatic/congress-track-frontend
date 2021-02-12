import VoteList from '../../components/Votes/Votes'
import Aux from '../../hoc/Aux';

class VotesView extends Component {
    
    state = {
        votes: [],
        activeVote: {},
        voteModal: false,
        loading: false,

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
            url: BASE_URL + '/api/votes',
        }).then((response) =>{
            this.setState({loading: false, votes: response.data.results.votes})
        })
    }

    getDetailedVoteData = (congress, chamber, session, roll_call) => {
        if (this.state.loading !== true){ this.setState({loading: true})}
        axios({
            method: 'get',
            url: BASE_URL + '/api/votes/' + congress + '/' + chamber + '/' + session + '/' + roll_call,
        }).then((response) =>{
            this.setState({loading: false, voteModal: true, activeVote: response.data.results.votes.vote})
        })
    }

    toggleVoteModal = () => {
        this.setState({voteModal: !this.state.voteModal})
    }

    render() {
        return (
            <Aux>
                { this.state.voteModal ? 
			    <VoteModal 
			        vote={this.state.activeVote} 
			        toggle={this.toggleVoteModal}
			        /> 
			    : null }
                <VoteList
                    voteList={this.state.voteList}
                    setActiveVote={this.setActiveVote}
                    />
            </Aux>
        )
    }

}

export default VotesView;
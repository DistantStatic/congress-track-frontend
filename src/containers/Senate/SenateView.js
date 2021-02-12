import MembersViews from '../../components/Members/Members';
import Aux from '../../hoc/Aux';

class Senate extends Component {
    
    state = {
        senateMembers = [],
        loading = false
    }

    componentDidMount() {
        this.getSenateMemberData();
    }
    
    setActiveMember = (member) => {
        this.setState({loading: true})
        this.getDetailedMemberData(member.id)
    }

    getSenateMemberData = () => {
        if (this.state.loading !== true){ this.setState({loading: true})}
        axios({
            method: 'get',
            url: BASE_URL + '/api/senate',
        }).then((response) =>{
            this.setState({loading: false, senateMembers: response.data.results[0].members})
        })
    }

    getDetailedMemberData = (mlink) => {
        if (this.state.loading !== true){ this.setState({loading: true})}
        axios({
            method: 'get',
            url: BASE_URL + '/api/member/' + mlink,
        }).then((response) =>{
            this.setState({loading: false, memberModal: true, activeMember: response.data.results[0]})
        })
    }

    toggleMemberModal = () => {
        this.setState({memberModal: !this.state.memberModal})
    }

    render() {
        return (
            <Aux>
                { this.state.memberModal ? 
			        <MemberModal 
			        currentMember={this.state.activeMember} 
			        toggle={this.toggleMemberModal}
				/> 
			: null }
            <MembersViews 
                memberList={this.state.senateMembers}
                setActiveMember={this.setActiveMember}
                chamber="senate" 
                />
            </Aux>
        )
    }
}

export default Senate;
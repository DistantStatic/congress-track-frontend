import MembersViews from '../../components/Members/Members';
import Aux from '../../hoc/Aux';

class House extends Component {

    state = {
        activeMember: {},
        houseMembers: [],
        loading: false,
        memberModal: false,
    }

    componentDidMount() {
        this.getHouseMemberData();
    }

    setActiveMember = (member) => {
        this.setState({loading: true})
        this.getDetailedMemberData(member.id)
    }

    getHouseMemberData = () => {
        if (this.state.loading !== true){ this.setState({loading: true})}
        axios({
            method: 'get', 
            url: BASE_URL + '/api/house',
        }).then((response) =>{
            this.setState({loading: false, houseMembers: response.data.results[0].members})
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
                memberList={this.state.houseMembers} 
                setActiveMember={this.setActiveMember}
                chamber="house"
                />
            </Aux>
        )
    }
    
}

export default House;
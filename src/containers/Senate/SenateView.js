import { Component } from 'react';

import MembersList from '../../components/Members/Members';
import MemberModal from '../../modals/MemberModal';
import Navigation from '../../utility/Navigation/Navigation';
import Loading from '../../utility/Loading/LoadingComp';
import Aux from '../../hoc/Aux';

import axios from '../../axios-instances/axios-backend';

import * as JsSearch from 'js-search';

class Senate extends Component {
    
    state = {
        activeMember: {},
        senateMembers: [],
        loading: false,
        memberModal: false,
        searchList: null,
        searchSenate: new JsSearch.Search("last_name"),
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
            url: '/api/senate',
        }).then((response) =>{
            this.setState({loading: false, senateMembers: response.data.results[0].members})
        })
    }

    getDetailedMemberData = (mlink) => {
        if (this.state.loading !== true){ this.setState({loading: true})}
        axios({
            method: 'get',
            url: '/api/member/' + mlink,
        }).then((response) =>{
            this.setState({loading: false, memberModal: true, activeMember: response.data.results[0]})
        })
    }

    toggleMemberModal = () => {
        this.setState({memberModal: !this.state.memberModal})
    }

    searchSenateMember = (a) => {
        console.log(a);
        const search = this.state.searchSenate;
        search.addDocuments(this.state.senateMembers)
        search.addIndex("first_name")
        search.addIndex("last_name")
        let result = search.search(a)
        console.log(result);
        if (result.length < 1 ) {
            result = this.state.senateMembers
        }
        this.setState({searchList: result})
    }

    render() {
        return (
            <Aux>
                {!this.state.senateMembers.length ? <Loading /> : null}
                <Navigation 
                    page="Senate"
                    search={this.searchSenateMember}
                    />
                { this.state.memberModal ? 
			    <MemberModal 
			        currentMember={this.state.activeMember} 
		            toggle={this.toggleMemberModal}
			        /> 
			    : null }
                <div className="main-display scroll-test row">
                    <MembersList
                        memberList={this.state.searchList ? 
                                        this.state.searchList : 
                                        this.state.senateMembers}
                        setActiveMember={this.setActiveMember}
                        />
                </div>
            </Aux>
        )
    }
}

export default Senate;
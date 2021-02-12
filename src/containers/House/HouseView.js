import { Component } from 'react';

import MembersList from '../../components/Members/Members';
import MemberModal from '../../modals/MemberModal';
import Navigation from '../../utility/Navigation/Navigation';
import Loading from '../../utility/Loading/LoadingComp';
import Aux from '../../hoc/Aux';

import axios from '../../axios-instances/axios-backend';

import * as JsSearch from 'js-search';

class House extends Component {

    state = {
        activeMember: {},
        houseMembers: [],
        loading: false,
        memberModal: false,
        searchList: null,
        searchHouse: new JsSearch.Search("last_name"),
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
            url: '/api/house',
        }).then((response) =>{
            this.setState({loading: false, houseMembers: response.data.results[0].members})
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

    searchHouseMember = (a) => {
        const search = this.state.searchHouse
        search.addDocuments(this.state.houseMembers)
        search.addIndex("first_name")
        search.addIndex("last_name")
        let result = search.search(a)
        if (result.length < 1 ) {
            result = this.state.senateMembers
        }
        this.setState({searchList: result})
    }

    render() {
        return (
            <Aux>
                {!this.state.houseMembers.length ? <Loading /> : null}
                <Navigation 
                    page="House"
                    search={this.searchHouseMember}
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
                                        this.state.houseMembers}
                        setActiveMember={this.setActiveMember}
                        />
                </div>
            </Aux>
        )
    }
    
}

export default House;
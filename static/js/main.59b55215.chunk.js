(this.webpackJsonpgovtrack=this.webpackJsonpgovtrack||[]).push([[0],{37:function(e,t,s){},38:function(e,t,s){},67:function(e,t,s){"use strict";s.r(t);var r=s(1),c=s(3),a=s.n(c),l=s(13),n=s.n(l),i=(s(37),s(9)),o=s(15),d=s(11),j=s(10),b=(s(38),s(12)),h=s.n(b),u=(s(57),s(16)),m=s(84),O=s(68),x=s(69),p=s(70),g=s(71),f=s(72),v=s(73),M=s(74),_=s(75),y=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(e){var c;return Object(i.a)(this,s),(c=t.call(this,e)).truncate=function(e){return e.length>120?e.substring(0,117)+"...":e},c.render=function(){var e=c.props.toggle;return Object(r.jsxs)(m.a,{isOpen:!0,toggle:e,children:[Object(r.jsx)(O.a,{toggle:e,children:c.state.currentBill.bill_id.toUpperCase()+" | "+(c.state.currentBill.active?"Active":"Inactive")}),Object(r.jsx)(x.a,{children:Object(r.jsxs)(p.a,{children:[Object(r.jsxs)(g.a,{children:[Object(r.jsx)(f.a,{children:"Title: "}),Object(r.jsx)(v.a,{children:c.state.currentBill.title})]}),Object(r.jsxs)(g.a,{children:[Object(r.jsx)(f.a,{children:"Important Dates: "}),Object(r.jsxs)(v.a,{children:[Object(r.jsx)("i",{children:"Introduced: "}),c.state.currentBill.introduced_date]}),Object(r.jsxs)(v.a,{children:[Object(r.jsx)("i",{children:"Lastest Action: "}),c.state.currentBill.latest_major_action_date]}),Object(r.jsx)(v.a,{children:c.state.currentBill.latest_major_action})]}),Object(r.jsxs)(g.a,{children:[Object(r.jsx)(f.a,{children:"Sponsor(s): "}),Object(r.jsx)(v.a,{children:c.state.currentBill.sponsor_title+" "+c.state.currentBill.sponsor+" + "+c.state.currentBill.cosponsors}),c.state.currentBill.cosponsors>0?"D: "+(c.state.currentBill.cosponsors_by_party.D>0?c.state.currentBill.cosponsors_by_party.D:"0")+" | R: "+(c.state.currentBill.cosponsors_by_party.R>0?c.state.currentBill.cosponsors_by_party.R:"0"):null]})]})}),Object(r.jsxs)(M.a,{children:[Object(r.jsx)(_.a,{color:"primary",href:c.state.currentBill.congressdotgov_url,children:"Go to bill page"}),Object(r.jsx)(_.a,{onClick:e,children:"Cancel"})]})]})},c.state={currentBill:Object(u.a)({},e.currentBill)},c}return s}(c.Component),B=s(76),N=s(77),k=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(e){var c;return Object(i.a)(this,s),(c=t.call(this,e)).makeRoleList=function(e){var t=[];return e.forEach((function(e,s){t.push(Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{scope:"row",children:e.congress}),Object(r.jsx)("td",{children:e.chamber}),Object(r.jsx)("td",{children:e.bills_sponsored}),Object(r.jsx)("td",{children:e.bills_cosponsored}),Object(r.jsx)("td",{children:e.total_votes}),Object(r.jsx)("td",{children:e.missed_votes_pct+"%"}),Object(r.jsx)("td",{children:e.total_present}),Object(r.jsx)("td",{children:e.votes_with_party_pct+"%"}),Object(r.jsx)("td",{children:e.votes_against_party_pct+"%"})]}))})),t},c.makeCommitteeList=function(e){var t=[];return e.forEach((function(e,s){console.log(e.name),t.push(Object(r.jsx)("li",{children:e.name}))})),t},c.render=function(){var e=c.props.toggle;return Object(r.jsxs)(m.a,{className:"member-modal",isOpen:!0,toggle:e,children:[Object(r.jsx)(O.a,{toggle:e,className:c.state.currentMember.roles[0].party+"party",children:c.state.currentMember.roles[0].title+" "+c.state.currentMember.first_name+" "+c.state.currentMember.last_name+" | "+c.state.currentMember.roles[0].party+" - "+c.state.currentMember.roles[0].state}),Object(r.jsx)(x.a,{children:Object(r.jsxs)(p.a,{children:[null!=c.state.currentMember.roles[0].leadership_role?Object(r.jsx)(g.a,{children:Object(r.jsx)(f.a,{children:c.state.currentMember.roles[0].leadership_role})}):null,Object(r.jsxs)(g.a,{children:[Object(r.jsx)(f.a,{children:"Actions in congress: "}),Object(r.jsx)("div",{className:"holds-table",children:Object(r.jsxs)(B.a,{children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{children:"Congress #"}),Object(r.jsx)("th",{children:"Chamber"}),Object(r.jsx)("th",{children:"Bills Sponsored"}),Object(r.jsx)("th",{children:"Bills Cosponsored"}),Object(r.jsx)("th",{children:"Total Votes"}),Object(r.jsx)("th",{children:"Missed Votes %"}),Object(r.jsx)("th",{children:"Present Votes"}),Object(r.jsx)("th",{children:"Votes With Party %"}),Object(r.jsx)("th",{children:"Votes Against Party %"})]})}),Object(r.jsx)("tbody",{children:c.makeRoleList(c.state.currentMember.roles)})]})})]}),c.state.currentMember.roles[0].committees.length>0?Object(r.jsxs)(g.a,{children:[Object(r.jsx)(f.a,{children:"Committees: "}),Object(r.jsx)(N.a,{children:c.makeCommitteeList(c.state.currentMember.roles[0].committees)})]}):null]})}),Object(r.jsxs)(M.a,{children:[null!=c.state.currentMember.url?Object(r.jsx)(_.a,{color:"secondary",href:c.state.currentMember.url,target:"_blank",children:"Gov Page"}):null,null!=c.state.currentMember.facebook_account?Object(r.jsx)(_.a,{color:"primary",href:"https://www.facebook.com/"+c.state.currentMember.facebook_account,target:"_blank",children:"Facebook"}):null,null!=c.state.currentMember.twitter_account?Object(r.jsx)(_.a,{color:"info",href:"https://www.twitter.com/"+c.state.currentMember.twitter_account,target:"_blank",children:"Twitter"}):null,null!=c.state.currentMember.youtube_account?Object(r.jsx)(_.a,{color:"danger",href:"https://www.youtube.com/"+c.state.currentMember.youtube_account,target:"_blank",children:"YouTube"}):null]})]})},c.state={currentMember:Object(u.a)({},e.currentMember)},c}return s}(c.Component),C=s(78),D=s(79),S=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(e){var c;return Object(i.a)(this,s),(c=t.call(this,e)).render=function(){return Object(r.jsx)("div",{className:"captivate",children:Object(r.jsx)(C.a,{children:Object(r.jsx)(D.a,{style:{width:"10em",height:"10em"},color:"primary"})})})},c}return s}(c.Component),w=s(80),A=s(81),L=s(82),T=s(83),F="https://congress-track-backend-3ujyc.ondigitalocean.app",P=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(e){var c;return Object(i.a)(this,s),(c=t.call(this,e)).componentDidMount=function(){c.getSenateMemberData(),c.getHouseMemberData(),c.getBillData()},c.truncate=function(e){return e.length>60?e.substring(0,57)+"...":e},c.setActiveMember=function(e){c.setState({loading:!0}),c.getDetailedMemberData(e.id)},c.setActiveBill=function(e){c.setState({loading:!0}),c.getDetailedBillData(e.bill_slug)},c.getSenateMemberData=function(){h()({method:"get",url:F+"/api/senate",data:{}}).then((function(e){c.setState({senateMembers:e.data.results[0].members})}))},c.getHouseMemberData=function(){h()({method:"get",url:F+"/api/house",data:{}}).then((function(e){c.setState({houseMembers:e.data.results[0].members})}))},c.getBillData=function(){h()({method:"get",url:F+"/api/bills",data:{}}).then((function(e){c.setState({loading:!1,bills:e.data.results[0].bills})}))},c.getDetailedMemberData=function(e){h()({method:"get",url:F+"/api/member/"+e,data:{}}).then((function(e){c.setState({loading:!1,memberModal:!0,activeMember:e.data.results[0]})}))},c.getDetailedBillData=function(e){h()({method:"get",url:F+"/api/bills/"+e,data:{}}).then((function(e){c.setState({loading:!1,billModal:!0,activeBill:e.data.results[0]})}))},c.renderBills=function(e){var t=[];return e.forEach((function(e){t.push(Object(r.jsx)("div",{className:"col-sm-4",children:Object(r.jsxs)(w.a,{children:[Object(r.jsx)("div",{className:"card-header "+e.sponsor_party+"party",children:e.bill_id.toUpperCase()}),Object(r.jsx)(A.a,{children:Object(r.jsx)("h3",{children:c.truncate(e.short_title)})}),Object(r.jsx)(L.a,{className:"my-body",children:Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h5",{className:"card-title",children:"Sponsor(s): "+e.sponsor_name+" + "+e.cosponsors}),Object(r.jsxs)("ul",{className:"list-group list-group-flush",children:[Object(r.jsx)("li",{className:"list-group-item",children:Object(r.jsx)("a",{href:e.congressdotgov_url,children:e.congressdotgov_url})}),Object(r.jsx)("li",{className:"list-group-item",children:"Last Major Action Date: "+e.latest_major_action_date})]})]})}),Object(r.jsx)(T.a,{children:Object(r.jsx)(_.a,{onClick:c.setActiveBill.bind(Object(o.a)(c),e),children:"Find Out More"})})]})}))})),t},c.renderCongressMembers=function(e){var t=[];return e.forEach((function(e){t.push(Object(r.jsx)("div",{className:"col-sm-4",children:Object(r.jsxs)(w.a,{children:[Object(r.jsx)("div",{className:"card-header "+e.party+"party",children:e.title+" | "+e.party+" - "+e.state}),Object(r.jsxs)("div",{className:"card-title-section",children:[Object(r.jsx)("h1",{className:"card-title",children:e.first_name}),Object(r.jsx)("h1",{className:"card-title",children:e.last_name})]}),Object(r.jsx)(L.a,{className:"my-body",children:Object(r.jsx)("div",{className:"container",children:Object(r.jsxs)(p.a,{className:"list-group-flush",children:[Object(r.jsx)(g.a,{children:"Total Votes: "+e.total_votes+" | Missed: "+e.missed_votes+"("+e.missed_votes_pct+"%)"}),Object(r.jsx)(g.a,{children:"Next Election: "+e.next_election}),Object(r.jsx)(g.a,{children:"Address: "+e.office}),Object(r.jsx)(g.a,{children:"Phone: "+e.phone})]})})}),Object(r.jsx)(T.a,{children:Object(r.jsx)(_.a,{onClick:c.setActiveMember.bind(Object(o.a)(c),e),children:"Find Out More"})})]})}))})),t},c.displaySenate=function(){c.setState({pages:{house:!1,senate:!0,bills:!1}})},c.displayHouse=function(){c.setState({pages:{house:!0,senate:!1,bills:!1}})},c.displayBills=function(){c.setState({pages:{house:!1,senate:!1,bills:!0}})},c.dataDecider=function(){return Object(r.jsxs)("ul",{className:"nav",children:[Object(r.jsx)("li",{className:"nav-item",children:Object(r.jsx)("a",{onClick:c.displaySenate,className:"nav-link "+(c.state.pages.senate?"active":""),href:"#",children:"Senate"})}),Object(r.jsx)("li",{className:"nav-item",children:Object(r.jsx)("a",{onClick:c.displayHouse,className:"nav-link "+(c.state.pages.house?"active":""),href:"#",children:"House"})}),Object(r.jsx)("li",{className:"nav-item",children:Object(r.jsx)("a",{onClick:c.displayBills,className:"nav-link "+(c.state.pages.bills?"active":""),href:"#",children:"Bills"})})]})},c.toggleBillModal=function(){c.setState({billModal:!c.state.billModal})},c.toggleMemberModal=function(){c.setState({memberModal:!c.state.memberModal})},c.render=function(){return Object(r.jsxs)("div",{className:"App",children:[c.state.loading?Object(r.jsx)(S,{}):null,Object(r.jsxs)("div",{className:"header",children:[Object(r.jsx)("h1",{className:"title site-title",children:"TrackUS"}),Object(r.jsx)("h5",{className:"title sub-title text-muted",children:"Keep track of your Representatives in Washington"})]}),Object(r.jsx)("div",{className:"container",children:Object(r.jsxs)("div",{className:"main-display scroll-test row",children:[c.state.pages.senate?c.renderCongressMembers(c.state.senateMembers):"",c.state.pages.house?c.renderCongressMembers(c.state.houseMembers):"",c.state.pages.bills?c.renderBills(c.state.bills):""]})}),Object(r.jsx)("div",{className:"my-footer",children:c.dataDecider()}),c.state.memberModal?Object(r.jsx)(k,{currentMember:c.state.activeMember,toggle:c.toggleMemberModal}):null,c.state.billModal?Object(r.jsx)(y,{currentBill:c.state.activeBill,toggle:c.toggleBillModal}):null]})},c.state={loading:!0,senateMembers:[],houseMembers:[],bills:[],pages:{senate:!0,house:!1,bills:!1},activeMember:{},activeBill:{},billModal:!1,memberModal:!1},c}return s}(c.Component),E=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,85)).then((function(t){var s=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,l=t.getTTFB;s(e),r(e),c(e),a(e),l(e)}))};n.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(P,{})}),document.getElementById("root")),E()}},[[67,1,2]]]);
//# sourceMappingURL=main.59b55215.chunk.js.map
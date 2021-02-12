import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import BillsView from './containers/Bills/BillsView';
import VotesView from './containers/Votes/VotesView';
import HouseView from './containers/House/HouseView';
import SenateView from './containers/Senate/SenateView';
import { HashRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  	render() {
		return (
	  		<div className="App">
		  		<HashRouter basename="/">
					<Switch>
						<Route path="/senate" component={SenateView} />
						<Route path="/house" component={HouseView} />
						<Route path="/bills" component={BillsView} />
						<Route path="/votes" component={VotesView} />
						<Route path="" exact component={SenateView} />
					</Switch>
				</HashRouter>
				<div className="footer">
		  			<span>Data sourced from ProPublica</span>
				</div>
	  		</div>

		);
  	}
}

export default App;
import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import BillsView from './containers/Bills/BillsView';
import VotesView from './containers/Votes/VotesView';
import HouseView from './containers/House/HouseView';
import SenateView from './containers/Senate/SenateView';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  	render() {
		return (
	  		<div className="App">
		  		<BrowserRouter basemname={`/${process.env.REACT_APP_PUBLIC_URL}`}>
					<Route path="/" exact component={SenateView} />
					<Route path="/senate" component={SenateView} />
					<Route path="/house" component={HouseView} />
					<Route path="/bills" component={BillsView} />
					<Route path="/votes" component={VotesView} />
				</BrowserRouter>
				<div className="footer">
		  			<span>Data sourced from ProPublica</span>
				</div>
	  		</div>

		);
  	}
}

export default App;
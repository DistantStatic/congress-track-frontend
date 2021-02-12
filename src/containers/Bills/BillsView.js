import BillList from '../../components/Bills/Bills';
import Aux from '../../hoc/Aux';

class BillsView extends Component {

    state = {
		bills: [],
		activeBill: {},
		billModal: false,
		loading: false
    }

    componentDidMount() {
		this.getBillData();
    }

	setActiveBill = (bill) => {
		this.setState({loading: true})
		this.getDetailedBillData(bill.bill_slug)
	}

	getBillData = () => {
		if (this.state.loading !== true){ this.setState({loading: true})}
		axios({
		  	method: 'get',
		  	url: BASE_URL + '/api/bills',
		}).then((response) =>{
		  	this.setState({loading: false, bills: response.data.results[0].bills})
		})
	}
	
	getDetailedBillData = (blink) => {
		if (this.state.loading !== true){ this.setState({loading: true})}
		axios({
		  	method: 'get',
		  	url: BASE_URL + '/api/bills/' + blink,
		}).then((response) =>{
			this.setState({loading: false, billModal: true, activeBill: response.data.results[0]})
		})
	}

	toggleBillModal = () => {
		this.setState({billModal: !this.state.billModal})
	}

    render() {
        return (
			<Aux>
				{ this.state.billModal ? 
				<BillModal 
					currentBill={this.state.activeBill} 
					toggle={this.toggleBillModal}
					/> 
				: null }
				<BillList
					billList={this.state.bills}
					/>
			</Aux>
		)
    }
}

export default BillsView;
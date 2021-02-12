import {
    Nav,
    Navbar,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input
  } from 'reactstrap';
import { Link } from 'react-router-dom';

const navBar = (props) => {
    let handleChange = (e) => {
        let { value } = e.target;
        props.search(value);
    };

	return (
        <div className="header">
		    <h1 className="title site-title">TrackUS</h1>
		    <h5 className="title sub-title text-muted">Keep track of your Representatives in Washington</h5>
		    <div>
	            <Navbar light expand="sm">
	            	<Nav navbar className="my-nav">
	            	    <NavItem>
	            	    <UncontrolledDropdown>
	            	    	<DropdownToggle nav caret>
	            	    	    { props.page }
	            	    	</DropdownToggle>
	            	    	<DropdownMenu right>
                                <Link to={"/senate"}>
                                    <DropdownItem>
	            	    	    	    Senate
	            	    	        </DropdownItem>
                                </Link>
                                <Link to={"/house"}>
	            	    	        <DropdownItem>
	            	    	    	    House
	            	    	        </DropdownItem>
                                </Link>
	            	    	    <DropdownItem divider />
	            	    	    <Link to="/bills">
                                    <DropdownItem >
	            	    	    	    Recent Bills
	            	    	        </DropdownItem>
                                </Link>
	            	    	    <Link to="/votes">
	            	    	        <DropdownItem >
                                        Recent Votes
	            	    	        </DropdownItem>
                                </Link>
	            	    	</DropdownMenu>
	            	    </UncontrolledDropdown>
	            	    </NavItem>
	            	    <NavItem>
	            	    	<Input
	            	    	    type="text"
	            	    	    autoComplete="off"
	            	    	    name="search-bar"
	            	    	    onKeyUp={handleChange}
	            	    	    placeholder="Search..."
	            	    	/>
	            	    </NavItem>
	            	</Nav>
	            </Navbar>
		    </div>
		</div>
	)
}
export default navBar;
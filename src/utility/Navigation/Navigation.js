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

const navBar = (props) => {
    let handleChange = (e) => {
        let { value } = e.target;
        props.search(value);
    };

	return (
	    <Navbar light expand="sm">
	    	<Nav navbar className="my-nav">
	    	    <NavItem>
	    	    <UncontrolledDropdown>
	    	    	<DropdownToggle nav caret>
	    	    	    { props.page }
	    	    	</DropdownToggle>
	    	    	<DropdownMenu right>
                        <a href="/senate">
                            <DropdownItem>
	    	    	    	    Senate
	    	    	        </DropdownItem>
                        </a>
                        <a href="/house">
	    	    	        <DropdownItem>
	    	    	    	    House
	    	    	        </DropdownItem>
                        </a>
	    	    	    <DropdownItem divider />
	    	    	    <a href="/bills">
                            <DropdownItem >
	    	    	    	    Recent Bills
	    	    	        </DropdownItem>
                        </a>
	    	    	    <a href="/votes">
	    	    	        <DropdownItem >
                                Recent Votes
	    	    	        </DropdownItem>
                        </a>
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
	)
}
export default navBar;
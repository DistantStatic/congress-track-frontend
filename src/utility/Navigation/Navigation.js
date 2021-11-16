import {
    Nav,
    Navbar,
    Dropdown,
	FormControl
  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const navBar = (props) => {
    let handleChange = (e) => {
        let { value } = e.target;
        props.search(value);
    };

	return (
        <div className={styles.custNav}>
		    <h1 className="title site-title">TrackUS</h1>
		    <h5 className="title sub-title text-muted">Keep track of your Representatives in Washington</h5>
		    <div>
	            <Navbar expand="sm">
	            	<Nav navbar className={styles.searchBar}>
	            	    <Nav.Item>
	            	    <Dropdown menuVariant="Dark">
	            	    	<Dropdown.Toggle variant="dark"
								> 
	            	    	    { props.page }
	            	    	</Dropdown.Toggle>
	            	    	<Dropdown.Menu variant="dark">
                                <Link to={"/senate"}>
                                    <Dropdown.Item href="#/senate">
	            	    	    	    Senate
	            	    	        </Dropdown.Item>
                                </Link>
                                <Link to={"/house"}>
	            	    	        <Dropdown.Item href="#/house">
	            	    	    	    House
	            	    	        </Dropdown.Item>
                                </Link>
	            	    	    <Dropdown.Item divider />
	            	    	    <Link to="/bills">
                                    <Dropdown.Item href="#/bills" >
	            	    	    	    Recent Bills
	            	    	        </Dropdown.Item>
                                </Link>
	            	    	    <Link to="/votes">
	            	    	        <Dropdown.Item href="#/votes">
                                        Recent Votes
	            	    	        </Dropdown.Item>
                                </Link>
	            	    	</Dropdown.Menu>
	            	    </Dropdown>
	            	    </Nav.Item>
	            	    <Nav.Item>
	            	    	<FormControl
	            	    	    type="text"
	            	    	    autoComplete="off"
	            	    	    name="search-bar"
	            	    	    onKeyUp={handleChange}
	            	    	    placeholder="Search..."
	            	    	/>
	            	    </Nav.Item>
	            	</Nav>
	            </Navbar>
		    </div>
		</div>
	)
}
export default navBar;
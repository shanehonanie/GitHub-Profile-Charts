import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
	return (
		<nav className='bg-primary text-white'>
			<div className='row'>
				<h2 className='mr-auto pl-5'>
					<i className={icon}></i> {title}
				</h2>
				{/* <h3 className='justify-self-end bg-white'>
					<Link to='/'>Home</Link>
				</h3>
				<h3 className='justify-item-end pr-4 mx-5'>
					<Link to='/about'>About</Link>
				</h3> */}
			</div>
		</nav>
	);
};

Navbar.defaultProps = {
	title: 'Github Profile Enhanced',
	icon: 'fab fa-github'
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired
};

export default Navbar;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
	return (
		<header className='header'>
			<h2 className='header__title'>
				<i className={icon}></i> {title}
			</h2>

			<nav className='nav-links'>
				<h2 className='nav-links__link'>
					<Link to='/'>Home</Link>
				</h2>
				<h2 className='nav-links__link'>
					<Link to='/about'>About</Link>
				</h2>
			</nav>
		</header>
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

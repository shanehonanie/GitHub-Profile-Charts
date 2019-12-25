import React, { useState, useContext, Fragment } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const [text, setText] = useState('');

	const onSubmit = e => {
		e.preventDefault();
		if (text === '') {
			alertContext.setAlert('Please enter something', 'danger');
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	const onChange = e => setText(e.target.value);

	return (
		<Fragment>
			<form onSubmit={onSubmit} className='search'>
				<input
					className='search__input'
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChange}
				/>
				<input
					className='search__button-search btn-dark'
					type='submit'
					value='Search'
				/>
				{githubContext.users.length > 0 && (
					<button
						className='search__button-clear btn-light'
						onClick={githubContext.clearUsers}
					>
						Clear
					</button>
				)}
			</form>
		</Fragment>
	);
};

export default Search;

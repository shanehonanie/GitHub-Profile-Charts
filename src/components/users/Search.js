import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const [text, setText] = useState('');

	const onSubmit = e => {
		e.preventDefault();
		if (text === '') {
			alertContext.setAlert('Please enter something', 'light');
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	const onChange = e => setText(e.target.value);

	return (
		<div className='container'>
			<form onSubmit={onSubmit} className='form'>
				<div className='row mt-4'>
					<input
						style={{ minWidth: '100%' }}
						type='text'
						name='text'
						placeholder='Search Users...'
						value={text}
						onChange={onChange}
					/>
				</div>
				<div className='row mt-3'>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</div>
			</form>

			{githubContext.users.length > 0 && (
				<button
					className='btn btn-light btn-block'
					onClick={githubContext.clearUsers}
				>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;

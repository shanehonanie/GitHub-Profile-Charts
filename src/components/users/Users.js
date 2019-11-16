import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/GithubContext';

const Users = () => {
	const githubContext = useContext(GithubContext);

	const { loading, users } = githubContext;

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div className='container'>
				<div className='row justify-content-md-center'>
					{users.map(user => (
						<UserItem key={user.id} user={user}></UserItem>
					))}
				</div>
			</div>
		);
	}
};

export default Users;

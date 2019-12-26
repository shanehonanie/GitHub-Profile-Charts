import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'react-google-charts';

import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/GithubContext';
import SelectListGroup from '../UI/SelectListGroup';

const User = ({ match }) => {
	const [reposSortedBy, setReposSortedBy] = useState('updated_at');
	const githubContext = useContext(GithubContext);

	const {
		getUser,
		loading,
		user,
		repos,
		uniqueLangs,
		getUserLastUpdatedRepos,
		getUserRepoLanguages
	} = githubContext;

	useEffect(() => {
		getUser(match.params.login);
		getUserLastUpdatedRepos(match.params.login);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getUserRepoLanguages(user.login, repos);
		console.log('repos', repos);
		// eslint-disable-next-line
	}, [repos]);

	const formatCharData = arr => {
		let result = [];
		result.push(['Languages', 'Occurences']);

		for (const key in arr) result.push([key, arr[key]]);

		return result;
	};

	const inputChangedHandler = e => {
		setReposSortedBy(e.target.value);

		// sort the repos by asc or desc depending on criteria
		switch (e.target.value) {
			case 'size':
			case 'stargazers_count':
			case 'forks_count':
			case 'updated_at':
				// desc
				repos.sort(repoSort('-' + e.target.value));
				break;
			default:
				// asc
				repos.sort(repoSort(e.target.value));
				break;
		}
	};

	// Sort the repos object by property criteria
	const repoSort = property => {
		var sortOrder = 1;
		if (property[0] === '-') {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function(a, b) {
			var result =
				a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
			return result * sortOrder;
		};
	};

	const {
		name,
		company,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable
	} = user;

	let langChart = null;

	const selectListOptions = [
		{ label: 'Name', value: 'name' },
		{ label: 'Size', value: 'size' },
		{ label: 'Stars', value: 'stargazers_count' },
		{ label: 'Forks', value: 'forks_count' },
		{ label: 'Created', value: 'created_at' },
		{ label: 'Updated', value: 'updated_at' }
	];

	if (loading) return <Spinner />;

	if (Object.entries(uniqueLangs).length > 0) {
		langChart = (
			<Chart
				width={'500px'}
				height={'300px'}
				chartType='PieChart'
				loader={<Spinner />}
				data={formatCharData(uniqueLangs)}
				options={{
					title: '# of Language Occurences'
				}}
				rootProps={{ 'data-testid': '1' }}
			/>
		);
	}

	return (
		<Fragment>
			<div className='container'>
				<div className='btn-back-search'>
					<Link to='/' className='btn-success btn-sm-back'>
						Back To Search
					</Link>
				</div>

				{/* Top Card */}
				<div className='card'>
					<div className='user-info'>
						{/* Left Section */}
						<div className='user-info__left'>
							<img src={avatar_url} alt='' />
							<h1>{name}</h1>
							<p className='my-1'>Location: {location}</p>
							<p className='my-1'>
								Hireable:{' '}
								{hireable ? (
									<i className='fas fa-check text-success' />
								) : (
									<i className='fas fa-times-circle text-danger' />
								)}
							</p>
						</div>
						{/* Right Section */}
						<div className='user-info__right'>
							{bio && (
								<Fragment>
									<h2>Bio</h2>
									<p>{bio}</p>
								</Fragment>
							)}
							<a
								href={html_url}
								target='_blank'
								rel='noopener noreferrer'
								className='btn-dark user-info__right__btn'
							>
								Visit Github Profile
							</a>
							<p>
								{login && (
									<Fragment>
										<strong>Username: </strong> <span>{login}</span>
									</Fragment>
								)}
							</p>
							<p>
								{company && (
									<Fragment>
										<strong>Company: </strong>
										<span>{company}</span>
									</Fragment>
								)}
							</p>
							<p>
								{blog && (
									<Fragment>
										<strong>Website: </strong>
										<span className='ml-1'>{blog}</span>
									</Fragment>
								)}
							</p>
						</div>
					</div>
				</div>

				{/* Middle Card */}
				<div className='card card-middle'>
					<div className='public-info'>
						<div className='badge public-info__followers'>
							Followers: {followers}
						</div>
						<div className='badge public-info__following'>
							Following: {following}
						</div>
						<div className='badge public-info__repos'>
							Public Repos: {public_repos}
						</div>
						<div className='badge public-info__gists'>
							Public Gists: {public_gists}
						</div>
					</div>
				</div>

				{/* Bottom Card */}
				<div className='card card-bottom'>{langChart}</div>

				{/* Title and Select Group */}
				<div className='repo-header'>
					<h3>Latest Repos</h3>
					<div className='repo-header__sort-group'>
						<h5 className='repo-header__sort-group__label'>Sorted By</h5>
						<div className=''>
							<SelectListGroup
								name='repoSortedBySelect'
								value={reposSortedBy}
								onChange={inputChangedHandler}
								options={selectListOptions}
								className='repo-header__sort-group__select'
							/>
						</div>
					</div>
				</div>

				{/* User Repos */}
				<div className='repo-results'>
					{/* <div className='card-item'> */}
					<Repos repos={repos} />
					{/* </div> */}
				</div>
			</div>
		</Fragment>
	);
};

export default User;

import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo }) => {
	let lang = '';

	if (repo.language === 'JavaScript') lang = 'JS';
	else if (repo.language === 'TypeScript') lang = 'TS';
	else if (repo.language === '' || repo.language === null) lang = 'N/A';
	else lang = repo.language;

	const toReadibleDate = dateIn => {
		let date = new Date(dateIn);
		return (
			date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
		);
	};

	return (
		<div className='card card-repo-item'>
			<h3 className='card-repo-item__name'>
				<i className='octicon octicon-repo'></i>
				<a
					className=''
					href={repo.html_url}
					target='_blank'
					rel='noopener noreferrer'
				>
					{repo.name}
				</a>
			</h3>

			<p className='card-repo-item__description'>{repo.description}</p>

			<div className='card-repo-item__stats-group'>
				<small className='octicon octicon-code'>{lang}</small>
				<small className='octicon octicon-repo-forked'>{repo.forks}</small>
				<small className='octicon octicon-star'>{repo.stargazers_count}</small>
				<small className=''>{repo.size} KB</small>
			</div>

			<small className='card-repo-item__created'>
				Created: {toReadibleDate(repo.created_at)}
			</small>

			<small className='card-repo-item__updated'>
				Updated: {toReadibleDate(repo.updated_at)}
			</small>
		</div>
	);
};

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired
};

export default RepoItem;

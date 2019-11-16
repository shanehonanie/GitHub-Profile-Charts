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
		<div className='card col-lg-3 m-3'>
			<div className='card-body d-flex flex-column'>
				<div className='row align-self-center'>
					<h5>
						<i className='octicon octicon-repo'></i>
						<a className='text-break' href={repo.html_url}>
							{repo.name}
						</a>
					</h5>
				</div>

				<div className='row text-center'>
					<p className=''>{repo.description}</p>
				</div>

				<div className='row align-self-center mt-auto'>
					<small className='mr-2 octicon octicon-code'>{lang}</small>
					<small className='mx-2 octicon octicon-repo-forked'>
						{repo.forks}
					</small>
					<small className='mx-2 octicon octicon-star'>
						{repo.stargazers_count}
					</small>
					<small className='ml-2'>{repo.size} KB</small>
				</div>

				<div className=' align-self-center'>
					<small className=''>Created: {toReadibleDate(repo.created_at)}</small>
				</div>

				<div className=' align-self-center'>
					<small className=''>Updated: {toReadibleDate(repo.updated_at)}</small>
				</div>
			</div>
		</div>
	);
};

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired
};

export default RepoItem;

import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
	GET_REPO_LANGUAGES
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		uniqueLangs: [],
		loading: false
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users
	const searchUsers = async text => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items
		});
	};

	// Get User
	const getUser = async username => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_USER,
			payload: res.data
		});
	};

	// Get Repos
	const getUserLastUpdatedRepos = async username => {
		setLoading();

		// const res = await axios.get(
		// 	`https://api.github.com/users/${username}/repos?per_page=20&sort=updated:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		// );

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=20&sort=updated&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	};

	// Get Repo Launguages
	const getUserRepoLanguages = async (usernameIn, reposIn) => {
		//setLoading();

		let repoLangCalc = [];

		for (let i = 0; i < reposIn.length; i++) {
			const res = await axios.get(
				`https://api.github.com/repos/${usernameIn}/${reposIn[i].name}/languages`
			);

			for (const x in res.data) {
				repoLangCalc.push(x);
			}
		}

		const uniques = repoLangCalc.reduce((acc, val) => {
			acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
			return acc;
		}, {});

		dispatch({
			type: GET_REPO_LANGUAGES,
			payload: uniques
		});
	};

	// Clear Users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				uniqueLangs: state.uniqueLangs,
				searchUsers,
				clearUsers,
				getUser,
				getUserLastUpdatedRepos,
				getUserRepoLanguages
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;

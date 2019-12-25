import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, onChange, options }) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));
	return (
		<div>
			<select
				name={name}
				value={value}
				onChange={onChange}
				className='repo-header__sort-group__select'
			>
				{selectOptions}
			</select>
		</div>
	);
};

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
};

export default SelectListGroup;

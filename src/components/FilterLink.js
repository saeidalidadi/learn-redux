import React from 'react';
import { Link } from 'react-router';


export const FilterLink = ({ filter, children }) => (
	<Link
		to={filter === 'all' ? '/': filter}
    activeStyle={{
			textDecoration: 'none',
			color: 'black'
		}}>
		{children}
	</Link>
);

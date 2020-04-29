import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './Country.module.css';
import { getCountries } from '../../api';

const Country = ({changeCountry}) => {
	const[fetchedCountries, setFetchedCountries] = useState([]);
	useEffect(() => {
		const fetchCountries = async () => {
			setFetchedCountries(await getCountries());
		}
		fetchCountries();
	}, [setFetchedCountries]);

	return(
		<FormControl className={styles.formControl}>
				<NativeSelect className={styles.chosen} defaultValue="" onChange={(e) => changeCountry(e.target.value)}>
				<option value="">Global</option>
				{fetchedCountries.map((country, i) => <option key={i}  value={country}>{country}</option>)}
			</NativeSelect>
		</FormControl>
	)
};

export default Country;

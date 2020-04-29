import React from 'react';

import { Cards, Country, Graph } from './components';
import { getData } from './api/';
import styles from './App.module.css';


class App extends React.Component {
	state = {
		data: {},
		country:'',
	}

	async componentDidMount() {
		const data = await getData();
		this.setState({ data })
	}

	changeCountry = async (country) => {
		const data = await getData(country);
		this.setState({ data, country })
	}
	render() {
		const { data, country } = this.state;

		return(
			<div className={styles.container}>
				<Cards data={ data } />
				<Country changeCountry={this.changeCountry}  />
				<Graph data={ data } country={ country }/>
			</div>
		)
	}
}
export default App;

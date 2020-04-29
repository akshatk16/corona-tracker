import React from 'react';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({
	data: {
		confirmed,
		recovered,
		deaths,
		lastUpdate
	}
}) => {
	let options = {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	if (!confirmed) {
		return 'Loading...';
	}

	return (<div className={styles.container}>
		<Grid container spacing={3} justify="center">
			<Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.infected)}>
				<CardContent>
					<Typography className={styles.sec} gutterBottom>
						Infected
					</Typography>
					<Typography variant="h5" component="h2">
						<CountUp end={confirmed.value} duration={2} separator=","/>
					</Typography>
					<Typography className={styles.sec}>
						{new Date(lastUpdate).toLocaleDateString("en-IN", options)}
					</Typography>
					<Typography variant="body1" component="p">
						Total Active Cases of COVID-19 as of now.
					</Typography>
				</CardContent>
			</Grid>
			<Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.recovered)}>
				<CardContent>
					<Typography className={styles.sec} gutterBottom>
						Recovered
					</Typography>
					<Typography variant="h5" component="h2">
						<CountUp end={recovered.value} duration={1.5} separator=","/>
					</Typography>
					<Typography className={styles.sec}>
						{new Date(lastUpdate).toLocaleDateString("en-IN", options)}
					</Typography>
					<Typography variant="body1" component="p">
						Number of people that have recovered from COVID-19.
					</Typography>
				</CardContent>
			</Grid>
			<Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.deaths)}>
				<CardContent>
					<Typography className={styles.sec} gutterBottom>Deaths</Typography>
					<Typography variant="h5" component="h2">
						<CountUp end={deaths.value} duration={1} separator=","/>
					</Typography>
					<Typography className={styles.sec}>
						{new Date(lastUpdate).toLocaleDateString("en-IN", options)}
					</Typography>
					<Typography variant="body1" component="p">
						Total Deaths due to COVID-19 as of now.
					</Typography>
				</CardContent>
			</Grid>
		</Grid>
	</div>);
};
export default Cards;

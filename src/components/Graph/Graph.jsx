import React, { useState, useEffect } from "react";
import { getDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from './Graph.module.css';

const Graph = ({ data: { confirmed, recovered, deaths }, country }) => {
	const [dailyData, setDailyData] = useState({});

	useEffect(() => {
		const fetchAPI = async () => {
			const initialDailyData = await getDailyData();
			setDailyData(initialDailyData);
		};
	fetchAPI();
	}, [])

	const LineGraph = (
	 	dailyData[0] ? (
	    	<Line data = {{
		  	labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString("en-US", {month: 'short', day: 'numeric'})),
		  	datasets: [{
			    data: dailyData.map((data) => data.confirmed),
			    label: 'Infected',
			    borderColor: 'rgba(255, 150, 0, 0.9)',
			    color: 'white',
			    backgroundColor: 'rgba(255, 170, 0, 0.4)',
			    fill: true,
		  	}, {
			    data: dailyData.map((data) => data.deaths),
			    label: 'Deaths',
			    borderColor: 'red',
			    backgroundColor: 'rgba(255, 0, 0, 0.5)',
			    fill: true,
			},
		],
	}} options = {{
		legend: {
			display: true,
			labels: {
					    fontColor: "white",
					    fontSize: 18
					}
				  },
				  scales: {
					yAxes: [{
					    ticks: {
						  fontColor: "white",
						  fontSize: 20,
						  beginAtZero: true
					    }
					}],
					xAxes: [{
					    ticks: {
						  fontColor: "white",
						  fontSize: 18,
						  beginAtZero: true
					    }
					}]
				}
	}}
	    />
	  ) : null
	);

	const BarGraph = (
		confirmed ? (
			<Bar
				data={{
					labels: ['Infected', 'Recovered', 'Deaths'],
					datasets: [{
						label: 'People',
						backgroundColor: [
							'rgba(255,	170, 	0, 0.9)',
							'rgba(0, 	170,	0, 0.6)',
							'rgba(255, 	0,	0, 0.8)',
						],
						data:[confirmed.value, recovered.value, deaths.value]
					}]
				}}
				options={{
					legend: {
						display: false,
						labels: {
						                fontColor: "white",
						                fontSize: 18
						            }
						        },
						        scales: {
						            yAxes: [{
						                ticks: {
						                    fontColor: "white",
						                    fontSize: 20,
						                    beginAtZero: true
						                }
						            }],
						            xAxes: [{
						                ticks: {
						                    fontColor: "white",
						                    fontSize: 20,
						                    beginAtZero: true
						                }
						            }]
							},
					title: {
						display: true,
						text: `Covid Numbers from ${country}`,
						fontColor: '#ddd',
						fontSize: 24}
				}} />
		) : null
	)
	return(
		<div className = {styles.container}>
			{country ? BarGraph : LineGraph}
		</div>
	)
};

export default Graph;

import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const dailyUrl = 'https://covid19.mathdro.id/api/daily';
const countriesUrl = 'https://covid19.mathdro.id/api/countries';


export const getData = async (country) => {
	let countryUrl = url;
	if(country) {
		countryUrl = `${url}/countries/${country}`
	}
	try{
		const { data } = await axios.get(countryUrl);
		const reqdData = {
			confirmed: data.confirmed,
			recovered: data.recovered,
			deaths: data.deaths,
			lastUpdate: data.lastUpdate
		}
		return(reqdData);

	}
	catch(error){
		return(error)
	}
}

export const getDailyData = async () => {
  	try {
    		const { data } = await axios.get(dailyUrl);
    		return data.map(({ confirmed, deaths, reportDate: date }) => ({
			confirmed: confirmed.total,
			deaths: deaths.total,
			date }));
  } catch (error) {
    return error;
  }
};

export const getCountries = async () => {
	try {
		const { data: { countries }} = await axios.get(countriesUrl);
		return countries.map((country) => country.name);
	} catch(error) {
		return(error)
	}
}

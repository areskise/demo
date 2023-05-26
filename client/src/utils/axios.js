import axios from 'axios';
import Cookies from 'universal-cookie';

const instance = axios.create({
	baseURL: 'http://localhost:5000/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'content-type': 'application/json',
	},
});

instance.interceptors.request.use(async (config) => {
	// Handle token here ...
	const cookies = new Cookies();
	const token = cookies.get('token');
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token;
	}
	return config;
});

export default instance;

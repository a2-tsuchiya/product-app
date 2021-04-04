import axios from 'axios'

// axios.defaults.baseURL = process.env.ENDPOINT
// axios.defaults.headers.common['Content-Type'] = 'application/json'

const instance = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
	baseURL: process.env.ENDPOINT,
})

export default instance

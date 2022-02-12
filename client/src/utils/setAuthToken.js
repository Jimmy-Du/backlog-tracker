import axios from 'axios'

const setAuthToken = (token) => {
    // if token present, set auth header to token
    if (token) {
        axios.defaults.headers.common['Authorization'] = token
    }
    // else, delete auth header
    else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken
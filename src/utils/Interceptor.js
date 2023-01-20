import axios from 'axios'
import { history } from './history'

/**
 * Before hitting any HTTP request via axios it udergoes through interceptor 
 */
axios.interceptors.request.use(request => { return request })
axios.interceptors.request.use(
    request => { return request },
    error => {
        if (error && error.response?.status === 500) history.push('/oops');
        return Promise.reject(error)
    });
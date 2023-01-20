import axios from 'axios';

/**
 * Reusable function to handle all GET API Request
 * @param {String} url
 * @returns axios response
 */
export const GetRequest = url => {
    return axios({ method: 'GET', url: url });
}
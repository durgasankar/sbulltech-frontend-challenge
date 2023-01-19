import { createBrowserHistory } from 'history';

let newHistory = () => {
    try {
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.abort();
    } catch (err) { }
    return createBrowserHistory();
}
export const history = newHistory();
import sendRequest from './send-request';

const BASE_URL = '/api/exchange';

export function createExchange(exchange) {
    return sendRequest(BASE_URL, 'POST', exchange);
}

export function getAll(userId) {
    return sendRequest(BASE_URL + `/${userId}`);
}

export function getAllCompleted(userId) {
    return sendRequest(BASE_URL + `/completed/${userId}`)
}

export function acceptExchange(itemsData) {
    return sendRequest(BASE_URL, 'PUT', itemsData);
}

export function rejectExchange(exchangeId) {
    return sendRequest(BASE_URL + `/${exchangeId}`, 'DELETE');
}
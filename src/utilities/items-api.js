import sendRequest from './send-request';

const BASE_URL = '/api/items';

export function createItem(itemData) {
    return sendRequest(BASE_URL, 'POST', itemData);
}

export function getAll() {
    return sendRequest(BASE_URL);
}

export function getItem(itemId) {
    return sendRequest(BASE_URL + `/${itemId}`);
}

export function deleteItem(itemId) {
    return sendRequest(BASE_URL + `/delete/${itemId}`);
}
import sendRequest from './send-request';

const BASE_URL = '/api/items';

export function createItem(itemData) {
    return sendRequest(BASE_URL, 'POST', itemData);
}

export function getAll(userId) {
    return sendRequest(BASE_URL + `/all/${userId}`);
}

export function getItem(itemId) {
    return sendRequest(BASE_URL + `/${itemId}`);
}

export function getMyItems(userId) {
    return sendRequest(BASE_URL + `/mine/${userId}`);
}

export function deleteItem(itemId) {
    return sendRequest(BASE_URL + `/delete/${itemId}`, 'DELETE');
}
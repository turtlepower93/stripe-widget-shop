import sendRequest from './send-request';

const BASE_URL = '/api/orders';

export function getCart() {
  return sendRequest(`${BASE_URL}/cart`);
}

export function getConfirmation() {
  return sendRequest(`${BASE_URL}/`)
}

export function addToCart(itemId, quantity) {
  return sendRequest(`${BASE_URL}/cart/items/${itemId}`, 'POST', {"quantity":quantity})
}

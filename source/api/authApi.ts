import {configApi} from './config';
import {ROUTE_API} from './route';

export const onApiLogin = (email: string, password: string): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.auth;
  return fetch(fullUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  }).then(data => data.json()).then(d => {
    if (d.success) {
      return d.data.data;
    } else {
      if (typeof d.errors === 'string') {
        return d.errors;
      }
      return d.errors?.[0] || 'Email or Password not correct';
    }
  }).catch(() => {
    Promise.reject('');
  });
};
export const onApiLogout = (): void => {
  const fullUrl = configApi.baseUrl + ROUTE_API.logout;
  fetch(fullUrl, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import {configApi} from './config';
import {ROUTE_API} from './route';

export const onApiScrapUrl = (url: string): Promise<any> => {
  const fullUrl = `${configApi.baseUrlML + ROUTE_API.scrapperUrl}?url=${url}`;
  return fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((d) => {
      return d;
    })
    .catch((err) => {
      console.log({err});
      return 'Something error';
    });
};

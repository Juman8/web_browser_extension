import {configApi} from './config';
import {ROUTE_API} from './route';

let token = '';
export const setToken = (_token: string) => {
  token = _token;
};
export const getToken = () => {
  return token;
};
export const onCreateARecipe = (): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.addRecipe;
  return fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token,
    },
  }).then(data => data.json()).then(d => {
    return d;
  }).catch((err) => {
    console.log({err});
    return 'Something error';
  });
};

export const AddManyRecipeLineRequest = async (id: string | number, body: {recipeLines: any[];}): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.addRecipe + `/${id}/recipe-lines`;
  return fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  }).then(data => data.json()).then(d => {
    return d;
  }).catch(() => {
    return '';
  });
};

export const UpdateRecipeRequestV2 = async (id: string | number, body: any): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.addRecipe + `/${id}/v2`;
  return fetch(fullUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  }).then(data => data.json()).then(d => {
    return d;
  }).catch(() => {
    return '';
  });
};

export const onCheckScrapperUrl = async (url: string): Promise<any> => {
  const fullUrl = configApi.baseUrl + ROUTE_API.checkScrapperUrl;
  return fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({urlScrape: url}),
  }).then(data => data.json()).then(d => {
    console.log({d});
    return {
      isAlready: d?.data?.isScraped,
      idRecipe: d?.data?.recipeId,
    };
  }).catch(() => {
    return '';
  });
};
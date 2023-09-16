import { check } from 'k6';
import http from 'k6/http';

export const getNirmataUrl = () => {
  return `https://${__ENV.NIRMATA_URL}`;
}

export const getApiToken = () => {
  return `${__ENV.NIRMATA_API_TOKEN}`;
}

export const getHeadersWithAuth = (role = 'admin') => {
  const token = getApiToken(role);

  return {
    headers: {
      'Authorization': 'NIRMATA-API '+token,
      'Accept' : 'application/json, text/plain, */*',
      'Accept-Encoding' : 'gzip, deflate, br',
      'Accept-Language' : 'en-US,en;q=0.9'
    }
  }
}

export const getInstancesTest = (db, modelIndex, params) => {
  var url = getNirmataUrl()+'/'+db+'/api/'+modelIndex;
  const headers = getHeadersWithAuth('admin');

  if (params != undefined) {
    url += '?'+params;
  }

  console.log('GET '+url);

  const res = http.get(url, headers);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}

export const getInstanceTest = (db, modelIndex, id, params) => {
  var url = getNirmataUrl()+'/'+db+'/api/'+modelIndex+'/'+id;
  const headers = getHeadersWithAuth('admin');

  if (params != undefined) {
    url += '?'+params;
  }

  console.log('GET '+url);

  const res = http.get(url, headers);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}

export const getOneModelId = (db, modelIndex) => {
  const url = getNirmataUrl()+'/'+db+'/api/'+modelIndex+'?fields=id';
  const headers = getHeadersWithAuth('admin');

  const res = http.get(url, headers);
  const data = res.json();

  const firstInstance = data[0];
  return firstInstance.id;
}


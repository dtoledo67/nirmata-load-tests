

export const getNirmataUrl = () => {
  return `https://${__ENV.NIRMATA_URL}`;
}

export const getApiToken = (role = 'admin') => {
  console.log('getApiToken with role '+role);
  const token = '';
  switch (role) {
    case "admin":
      return `${__ENV.NIRMATA_ADMIN_API_TOKEN}`;
    case "platform":
      return `${__ENV.NIRMATA_PLATFORM_API_TOKEN}`;
    case "devops":
      return `${__ENV.NIRMATA_DEVOPS_API_TOKEN}`;
    default:
      console.log("Invalid role "+role);
      return null;
  }
}

export const getHeadersWithAuth = (role = 'admin') => {
  const token = getApiToken(role);
  console.log('getHeadersWithAuth token is '+token);

  return {
    headers: {
      'Authorization': 'NIRMATA-API '+token,
      'Accept' : 'application/json, text/plain, */*',
      'Accept-Encoding' : 'gzip, deflate, br',
      'Accept-Language' : 'en-US,en;q=0.9'
    }
  }
}

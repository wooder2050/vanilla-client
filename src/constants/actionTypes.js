  
const localClientDomain = `http://localhost:3000`;
const cloudClientDomain = 'https://www.thevanillamusic.info';

const localServerDomain = `http://localhost:5000`;
const cloudServerDomain = 'https://api.thevanillamusic.info';

const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? localServerDomain
    : cloudServerDomain;

const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? localClientDomain
    : cloudClientDomain;

module.exports = { CLIENT_URL, SERVER_URL };
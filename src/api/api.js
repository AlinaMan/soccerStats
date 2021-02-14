const axios = require('axios').default;

const baseURL = 'http://api.football-data.org/v2/';

const headers = { 'X-Auth-Token': 'bd096567c9794ad2bd8061b572332ecd' };

const getRequest = async url => axios({ url, method: 'get', baseURL, headers });

export default {
  getLeagues: () => getRequest('/competitions'),

  getTeams: () => getRequest('/teams'),
  getTeamInfo: id => getRequest(`/teams/${id}`),
  getTeamMatches: (id, query) => getRequest(`/teams/${id}/matches${query}`)
}
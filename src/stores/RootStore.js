import { makeAutoObservable } from 'mobx'
import apiService from '../api/api'

class RootStore {
  loading = {};
  notifications = [];

  leagues = [];
  teams = [];
  team = {
    data: {},
    matches: [],
  };

  constructor(api) {
    makeAutoObservable(this);

    this.api = api;
  }

  getLeagues = async () => {
    try {
      this.loading.leagues = true;

      const response = await this.api.getLeagues();

      this.leagues = response.data.competitions;
    } catch (e) {
      this.addNotification(e);
    } finally {
      this.loading.leagues = false;
    }
  }

  getTeams = async () => {
    try {
      this.loading.teams = true;

      const response = await this.api.getTeams();

      this.teams = response.data.teams;
    } catch (e) {
      this.addNotification(e)
    } finally {
      this.loading.teams = false;
    }
  }

  getTeamInfo = async (id) => {
    try {
      this.loading.team = true;

      const response = await this.api.getTeamInfo(id);

      this.team.data = response.data;
    } catch (e) {
      this.addNotification(e)
    } finally {
      this.loading.team = false;
    }
  }

  getTeamMatches = async (id, query) => {
    try {
      this.loading.matches = true;

      const response = await this.api.getTeamMatches(id, query);

      this.team.matches = response.data.matches;
    } catch (e) {
      this.addNotification(e)
    } finally {
      this.loading.matches = false;
    }
  }

  addNotification = e => {
    const notification = {
      id: new Date().getTime(),
      text: e.response ? e.response.data.message : 'Something went wrong',
    }

    this.notifications.push(notification);
    setTimeout(() => {
      this.notifications = this.notifications.filter(n => n.id !== notification.id);
    }, 5000);
  }
}

export default new RootStore(apiService)
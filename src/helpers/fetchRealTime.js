import { findByProp } from '../Utility'
import { setLiveData } from '../actions/index';
import { LIVE_DATA } from '../actions/types';
import { store } from '../App'
export const apiList = {
  searchTeamByName: 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=',
  searchTeamUrlByShortCode: 'https://www.thesportsdb.com/api/v1/json/{APIKEY}/searchteams.php?sname=',
  searchAllPlayersByTeamId: 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=133604',
  searchForPlayerByTeam: 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=',
  searchTeamsFifa: 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=FIFA%20Premier%20League',
  liveScoreByLeague: 'https://www.thesportsdb.com/api/v1/json/1/latestsoccer.php'
}

export const fetchApiData = (param) => {
  return fetch(apiList['searchAllPlayersByTeam'] + param, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json()).then((data) => console.log(data)).catch((err) => {
    console.log(err)
  })
}

export const fetchLiveData = () => {
  return fetch(apiList['liveScoreByLeague'], {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json()).then((data) => {
    // const payload = findByProp(data.teams['Match'], 'League', 'Superettan')[0]  // league id 4429 where League === FIFA World Cup
    store.dispatch({ type: LIVE_DATA, payload: data.teams['Match'] })
  }).catch((err) => {
    console.log(err)
  })
}
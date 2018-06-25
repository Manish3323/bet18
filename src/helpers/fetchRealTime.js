import { ObjectsToArray } from '../Utility'
import { NO_CURRENT_MATCHES } from '../actions/types';
export const apiList = {
  searchTeamByName: 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=',
  searchTeamUrlByShortCode: 'https://www.thesportsdb.com/api/v1/json/{APIKEY}/searchteams.php?sname=',
  searchAllPlayersByTeamId: 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=133604',
  searchForPlayerByTeam: 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=',
  searchTeamsFifa: 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=FIFA%20Premier%20League',
  liveScoreByLeague: 'https://www.thesportsdb.com/api/v1/json/1/latestsoccer.php',
  futureMatches: 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4429',
  pastMatches: 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4429'
}

export const fetchApiData = (param) => {
  return fetch(apiList['searchAllPlayersByTeam'] + param, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      mode: 'no-cors'
    }
  }).then((res) => res.json()).then((data) => console.log(data)).catch((err) => {
    console.log(err)
  })
}

export const fetchLiveData = () => {
  return fetch(apiList['liveScoreByLeague'], {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     
    }
  }).then((res) => res.json()).then((data) => {
    // const payload = findByProp(data.teams['Match'], 'League', 'Superettan')[0]  // league id 4429 where League === FIFA World Cup
    if (data.hasOwnProperty('teams')) {
      if (data.teams.hasOwnProperty('Match')) {
        return data.teams['Match']
      } if (Object.keys(data.teams).length == 0) {
        return NO_CURRENT_MATCHES
      }
      else {
        return ObjectsToArray(data.teams)
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}
export const fetchFutureData = () => {
  return fetch(apiList['futureMatches'], {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json()).then((data) => {
    // const payload = findByProp(data.teams['Match'], 'League', 'Superettan')[0]  // league id 4429 where League === FIFA World Cup
    return data.events
  }).catch((err) => {
    console.log(err)
  })
}

export const fetchPastData = (url) => {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json()).then((data) => {
    return data.events
  }).catch((err) => {
    console.log(err)
  })
}

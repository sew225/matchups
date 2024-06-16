#!/usr/bin/env python
# coding: utf-8

# In[56]:


import statsapi
import requests
import json
from datetime import datetime
import pytz


BASE_URL = "https://statsapi.mlb.com/api"

def main():
    today = datetime.today().strftime('%Y-%m-%d')

    sched = statsapi.schedule(date=today)


    games = []


    for game in sched:
        utc_time_str = game['game_datetime']
        utc_time = datetime.strptime(utc_time_str, "%Y-%m-%dT%H:%M:%SZ")
        utc_zone = pytz.timezone("UTC")
        utc_time = utc_zone.localize(utc_time)
        et_zone = pytz.timezone("America/New_York")
        et_time = utc_time.astimezone(et_zone)
        et_time_str = et_time.strftime("%I:%M %p EST")

        games.append({"time" : et_time_str, "away" : {'id': game['away_id'], 'sp' : game['away_probable_pitcher']}, "home": {'id': game['home_id'], 'sp' : game['away_probable_pitcher']}})
    # # for game in sched:
    games
        
    def check_div_index(div_id, league_id):
        div_index = -1
        if league_id == 103:
            # al team
            if div_id == 201:
                # al east
                div_index = 0
            elif div_id == 202:
                # al central
                div_index = 1
            elif div_id == 200:
                # al west
                div_index = 2
        elif league_id == 104:
            # nl team
            if div_id == 204:
                # nl east
                div_index = 0
            elif div_id == 205:
                # nl central
                div_index = 1
            elif div_id == 203:
                # nl west
                div_index = 2
        return div_index




    # In[57]:


    # print(games)

    # print(games)
    for game in games:
        # print(game)
        try:
            response_away = requests.get(f"{BASE_URL}/v1/teams/{game['away']['id']}")
            game['away']['div_id'] = response_away.json()['teams'][0]['division']['id']
            game['away']['league_id'] = response_away.json()['teams'][0]['league']['id']
            response_home = requests.get(f"{BASE_URL}/v1/teams/{game['home']['id']}")
            game['home']['div_id'] = response_home.json()['teams'][0]['division']['id']
            game['home']['league_id'] = response_home.json()['teams'][0]['league']['id']

        except requests.exceptions.RequestException as e:
            print(e)

    # games

    for game in games:
        away_div_id = game['away']['div_id']
        home_div_id = game['home']['div_id']
        away_league_id = game['away']['league_id']
        home_league_id = game['home']['league_id']
        game['away']['div_index'] = check_div_index(away_div_id, away_league_id)
        game['home']['div_index'] = check_div_index(home_div_id, home_league_id)

    games


    # In[59]:


    for game in games:
        away_div_index = game['away']['div_index']
        away_league_id = game['away']['league_id']
        away_team_id = game['away']['id']
        home_div_index = game['home']['div_index']
        home_league_id = game['home']['league_id']
        home_team_id = game['home']['id']
        home_response = requests.get(f"https://statsapi.mlb.com/api/v1/standings?leagueId={home_league_id}&season=2024&standingsTypes=regularSeason")
        away_response = requests.get(f"https://statsapi.mlb.com/api/v1/standings?leagueId={away_league_id}&season=2024&standingsTypes=regularSeason")
        if away_response.status_code == 200:
            away_json = away_response.json()
            away_division_data = away_json['records'][away_div_index]['teamRecords']
            for team in away_division_data:
                if team['team']['id'] == away_team_id:
                    game['away']['team_data'] = team
        if home_response.status_code == 200:
            home_json = home_response.json()
            home_division_data = home_json['records'][home_div_index]['teamRecords']
            for team in home_division_data:
                if team['team']['id'] == home_team_id:
                    game['home']['team_data'] = team


    return games

if __name__ == "__main__":
    main()

# importing the requests library
import requests
from urllib.parse import quote
import wikipediaapi
import json

wiki_wiki = wikipediaapi.Wikipedia('en')

keys_file = open("keys/mapbox.json")
keys = json.load(keys_file)

def nhl_api_request(path, params):
  urlPath = "http://statsapi.web.nhl.com{0}.".format(path)
  r = requests.get(url = urlPath, params = params)
  
  data = r.json()
  return data

def enhanced_nhl_api_request(path):
  urlPath = "http://api.nhle.com{0}.".format(path)
  r = requests.get(url = urlPath)
  
  data = r.json()
  return data

def mapbox_api_request(query):
  queryParam = quote(query.encode("utf-8"))
  url = "https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/{0}.json".format(queryParam)
  r = requests.get(url = url, params = {
    "access_token": keys["key"]
  })
  
  data = r.json()
  return data

def wiki_api_request(query):
  queryParam = query.replace(" ", "_") #quote(query.encode("utf-8"))
  page_py = wiki_wiki.page(queryParam)
  return page_py

def wiki_api_advanced_request(mainQuery, subQuery):
  response = wiki_api_request("{0} {1}".format(mainQuery, subQuery))
  if(response.exists() == False):
    response = wiki_api_request(mainQuery)
  return response
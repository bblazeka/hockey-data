from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor
from datetime import datetime, date, time, timedelta

from collections import Counter
import sys, json

from .database import sources
from .language import process_text

with open('keys.json') as json_file:
    data = json.load(json_file)
    consumer_key=data["consumer_key"]
    consumer_secret=data["consumer_secret"]
    access_token=data["access_token"]
    access_token_secret=data["access_token_secret"]

account_list = sources()

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
auth_api = API(auth, wait_on_rate_limit=True)

def detect_hashtags(status):
    hashtags = []
    if hasattr(status, "entities"):
        entities = status.entities
        if "hashtags" in entities:
            for ent in entities["hashtags"]:
                if ent is not None:
                    if "text" in ent:
                        hashtag = ent["text"]
                        if hashtag is not None:
                            hashtags.append(hashtag)
    return hashtags

def containing_keywords(text):
    return text.find("in net") > -1 or text.find("starting") > -1 or text.find("starts") > -1

def get_news():
    sources = []
    starting_news = []
    all_news = []
    if len(account_list) > 0:
        for target in account_list:
            item = auth_api.get_user(target["id"])
            sources.append({ "id": item.screen_name, "name": item.name, "team": target["team"]})
            tweets = item.statuses_count
            mentions = []
            tweet_count = 0
            end_date = datetime.utcnow() - timedelta(days=1)
            for status in Cursor(auth_api.user_timeline, id=target["id"], count=10).items():
                tweet_count += 1
                text = status.text
                if hasattr(status, 'truncated'):
                    if status.truncated:
                        text = auth_api.get_status(status.id, tweet_mode='extended')._json['full_text']
                if status.created_at < end_date:
                    print(tweet_count)
                    break
                words, names = process_text(text)
                all_news.append({
                    "source": { "id": item.screen_name, "name": item.name, "team": target["team"]},
                    "created_at" : status.created_at,
                    "text": text,
                    "names": names,
                    "hashtags": detect_hashtags(status),
                })

    return {
        "sources": sources,
        "news": sorted(all_news,key=lambda x: x['created_at'], reverse=True),
        "starts": sorted(starting_news,key=lambda x: x['created_at'], reverse=True)
    }
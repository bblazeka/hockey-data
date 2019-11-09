from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor
from datetime import datetime, date, time, timedelta
from collections import Counter
import sys, json

with open('keys.json') as json_file:
    data = json.load(json_file)
    consumer_key=data["consumer_key"]
    consumer_secret=data["consumer_secret"]
    access_token=data["access_token"]
    access_token_secret=data["access_token_secret"]

account_list = []
with open('sources.json') as json_file:
    data = json.load(json_file)
    for source in data["sources"]:
        account_list.append(source)

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
auth_api = API(auth)

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
            account_created_date = item.created_at
            delta = datetime.utcnow() - account_created_date
            account_age_days = delta.days
            if account_age_days > 0:
                hashtags = []
                mentions = []
                tweet_count = 0
                end_date = datetime.utcnow() - timedelta(days=3)
                for status in Cursor(auth_api.user_timeline, id=target["id"]).items():
                    tweet_count += 1
                    if status.created_at < end_date:
                        break
                    elif containing_keywords(status.text) and status.created_at > end_date:
                        starting_news.append({
                            "source": target,
                            "created_at" : status.created_at,
                            "text": status.text,
                        })
                    elif hasattr(status, "entities"):
                        entities = status.entities
                #        if "hashtags" in entities:
                #            for ent in entities["hashtags"]:
                #                if ent is not None:
                #                    if "text" in ent:
                #                        hashtag = ent["text"]
                #                        if hashtag is not None:
                #                            hashtags.append(hashtag)
                #            if "user_mentions" in entities:
                #                for ent in entities["user_mentions"]:
                #                    if ent is not None:
                #                        if "screen_name" in ent:
                #                            name = ent["screen_name"]
                #                            if name is not None:
                #                                mentions.append(name)
                #print()
                #print("Most mentioned Twitter users:")
                #for item, count in Counter(mentions).most_common(10):
                #  print(item + "\t" + str(count))

                #print()
                #print("Most used hashtags:")
                #for item, count in Counter(hashtags).most_common(10):
                #  print(item + "\t" + str(count))

                #print()
                #print("All done. Processed " + str(tweet_count) + " tweets.")
                #print()
    # sorting news depending on time of creation

    return {
        "sources": sources,
        "news": sorted(all_news,key=lambda x: x['created_at'], reverse=True),
        "starts": sorted(starting_news,key=lambda x: x['created_at'], reverse=True)
    }
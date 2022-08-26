from bs4 import BeautifulSoup
import requests
import re
from re import sub
from decimal import Decimal

def scrapPlayerCapHit(name):
  query = name.replace("'", "").replace(" ", "-").lower()
  page = requests.get('https://www.capfriendly.com/players/{0}'.format(query))
  contents = page.content
  soup = BeautifulSoup(contents, 'html.parser')
  cap_hit_div = soup.find('div', text=re.compile('^Cap Hit:'))
  if cap_hit_div is None:
    return Decimal(0)
  cap_hit = Decimal(sub(r'[^\d.]', '', cap_hit_div.get_text()))
  return cap_hit

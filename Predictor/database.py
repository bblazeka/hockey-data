import sys, json
import pyodbc

with open('database.json') as json_file:
    data = json.load(json_file)
    username = data["user"]
    database = data["database"]
    password = data["password"]
    server = data["server"]

server = server
database = database
username = username
password = password
driver= '{ODBC Driver 17 for SQL Server}'
cnxn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()

def sources():
    sources = []
    cursor.execute("select * from sources")
    row = cursor.fetchone()
    while row:
        sources.append({
            "id": row[1],
            "team": row[2]
        })
        row = cursor.fetchone()
    return sources

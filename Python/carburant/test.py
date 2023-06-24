import pandas
import time
import datetime
from pytz import timezone
import os
os.chdir("/home/awakeneru/repos/file-transfer/Python/carburant")

start = time.time()


def flyDist(lat1, lon1, lat2, lon2):
    from geopy import distance
    return distance.distance((lat1, lon1), (lat2, lon2))


def drivingDist(lat1, lon1, lat2, lon2):
    import requests
    import json
    r = requests.get(
        f"http://router.project-osrm.org/route/v1/car/{lon1},{lat1};{lon2},{lat2}?overview=false""")
    routes = json.loads(r.content)
    route_1 = routes.get("routes")[0]
    return str(int(route_1['distance'])/1000)+" km"


def dateToDays(s):
    s = str(s)
    if s=="" or s=="nan": return 0
    if "." in s:
        s = s[:s.index(".")]
    if len(s.split()) > 1:
        ls = s.split()[0].split("-")+s.split()[1].split(":")
        l = [int(i) for i in ls]
        return l[0]*365.25+l[1]*30.4375+l[2]+(l[3]+l[4]/60)/24
    else:
        ls = s.split("-")
        l = [int(i) for i in ls]
        return l[0]*365.25+l[1]*30.4375+l[2]


def daysToStrTime(n):
    return str(int(n//365.25)) + " an(s) " + str(
        int(n % 365.25//30.4375))+" mois "+str(
        int(n % 365.25 % 30.4375)) + "j "+str(
        int(n % 365.25 % 30.4375 % 1 * 24)) + "h"+str(
        round(n % 365.25 % 30.4375 % 1 * 24 % 1*60))


def timeDiffParis(date):
    from pytz import timezone
    from datetime import datetime
    parisTime = datetime.now(timezone("Europe/Paris"))
    return dateToDays(parisTime)-dateToDays(date)


def ilYA(s):
    return daysToStrTime(timeDiffParis(s))


def reduceStrTime(s):
    while s[0] not in "123456789":
        s = s[1:]
    return s


parisTime = datetime.datetime.now(timezone("Europe/Paris"))

myCoord = lat, lon = 50.52503389984545, 3.176484126375738
nDep = 59
delay = 1  # en jours !
delay = dateToDays(datetime.datetime.now(timezone("Europe/Paris")))-dateToDays(
    datetime.date.today())  # hours passed since today, converted in days of course

df = pandas.read_csv(
    'prix-des-carburants-en-france-flux-instantane-v2.csv')
cols = list(df.columns)
print(*cols, sep="\n")  # noice format m8
import urllib.request
from bs4 import BeautifulSoup
import json

BASE_URL = "https://catalog.iastate.edu"
data = []

html = urllib.request.urlopen(f"{BASE_URL}/azcourses/")
text = html.read().decode("utf-8")
html.close()

soup = BeautifulSoup(text, "html.parser")
majors = soup.find_all("div", id="atozindex")[0].find_all("li")

for major in majors:
    data.append({"major": major.a.string})
    data[-1]["loc"] = major.a.get("href")
    data[-1]["courses"] = []

for major in data:
    html = urllib.request.urlopen(f"{BASE_URL}{major['loc']}")
    text = html.read().decode("utf-8")
    html.close()
    soup = BeautifulSoup(text, "html.parser")

    print(text)

    courses = soup.find_all("a", class_="toggle-accordion courseblocklink open")
    for course in courses:
        major["courses"].append(course.text.replace("\u00a0", "").replace("\n", ""))

file = open("courses.json", "w")
file.write(json.dumps(data, indent=4))
file.close()

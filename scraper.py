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

    courses = soup.find_all("a", class_="toggle-accordion courseblocklink open")
    credits = soup.find_all("p", class_="credits noindent")
    for course, credit in zip(courses, credits):
        if "(COMS)" in major["major"] or "(CPRE)" in major["major"] or "(SE)" in major["major"]:
            major["courses"].append({})
            major["courses"][-1]["courseCode"] = course.text.replace("\u00a0", "").replace("\n", "").split(':')[0]
            major["courses"][-1]["courseTitle"] = course.text.replace("\u00a0", "").replace("\n", "").split(':')[1].strip()
            major["courses"][-1]["credits"] = credit.text.split(':')[1].split('.')[0].strip()
            major["courses"][-1]["img"] = ""

file = open("data.json", "w")
file.write(json.dumps(data, indent=4))
file.close()

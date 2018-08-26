#!/usr/bin/env python3

import cgi
import cgitb
import sys
import cx_Oracle
cgitb.enable()

from jinja2 import Environment, FileSystemLoader

with open("../../password.txt", 'r') as pwf:
    pw=pwf.read().strip()

def getMarkers():
	conn = cx_Oracle.connect(dsn="geosgen", user="s1774346", password=pw)
	c = conn.cursor()
	c.execute("SELECT A.PLACENAME_ID, A.DESCRIPTION, B.ICON_PATH, C.CATEGORY_TYPE, A.LATITUDE, A.LONGITUDE FROM PLACENAMES A, ICONS B, CATEGORIES C WHERE A.CATEGORY_ID =C.CATEGORY_ID AND B.ICON_ID = A.ICON_ID ")
	markers = []
	for row in c:
		markers.append([row[0],row[1],row[2],row[3], row[4], row[5]])
	conn.close
	return markers
def getIcons():
	conn = cx_Oracle.connect(dsn="geosgen", user="s1774346", password=pw)
	c = conn.cursor()
	c.execute("SELECT DISTINCT A.ICON_PATH, A.ICON_TYPE, B.CATEGORY_TYPE FROM ICONS A, CATEGORIES B, PLACENAMES C WHERE  B.CATEGORY_ID =C.CATEGORY_ID AND A.ICON_ID = C.ICON_ID ORDER BY B.CATEGORY_TYPE")
	icons = []
	for row in c:
		icons.append([row[0],row[1],row[2]])
	conn.close
	return icons

def getPeople():
	conn = cx_Oracle.connect(dsn="geosgen", user="s1774346", password=pw)
	c = conn.cursor()
	c.execute("SELECT A.PEOPLE_ID, A.SURNAME, A.OTHERNAMES FROM PEOPLE  A ORDER BY SURNAME" )
	people = []
	for row in c:
		people.append([row[0], row[1],row[2]])
	conn.close
	return people


def render_site():
    env = Environment(loader=FileSystemLoader('../jinja'))
    template = env.get_template('islaymap.html')
    return template.render(markers=markers, icons=icons, people = people)

markers = getMarkers()
icons = getIcons()
people = getPeople()


print(render_site())




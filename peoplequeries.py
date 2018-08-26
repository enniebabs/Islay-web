#!/usr/bin/env python3


import cgi
import cgitb
import sys
import json
import cx_Oracle

cgitb.enable()


fs = cgi.FieldStorage()

with open("../../password.txt", 'r') as pwf:
	pw=pwf.read().strip()


# THE FIELD STORAGE INTERACTS WITH THE CLIENT SIDE, 
peopleid=0
if 'peopleid' in fs:
	peopleid=fs['peopleid'].value


#SQL QUERIES, RESULTS ARE RETURNED TO AJAX
peopleinfoquery = """ 
SELECT coalesce(SURNAME,'Unknown'), coalesce(OTHERNAMES, 'Unknown') , coalesce(MAIDEN_NAME, 'Unknown') , coalesce(STATUS,'Unknown'),  coalesce(BURIED_AT,'Unknown'), coalesce(REFERENCE,'Unknown'), coalesce(DBMS_LOB.substr(SUPPLEMENTARY, 3000),'Unknown'), coalesce(DBMS_LOB.substr(SUPPLEMENTARY, 3000, 3001),' '), coalesce(cast(AGE as varchar(19)), 'Unknown'), coalesce(cast(YEAR_BORN as varchar(19)), 'Unknown'),coalesce(cast(YEAR_MARRIED as varchar(19)), 'Unknown'),coalesce(cast(YEAR_DIED as varchar(19)), 'Unknown'),coalesce(GENDER, 'Unknown'),coalesce(BIRTHPLACE, 'Unknown'),coalesce(PARISH, 'Unknown'), coalesce(SCHEDULE_NUMBER, 'Unavailable') FROM PEOPLE WHERE PEOPLE_ID = """ + str(peopleid)

familyinfoquery = """

SELECT A.SURNAME, A.OTHERNAMES, C.DESCRIPTION from PEOPLE A inner join RELATIONSHIP B on (A.PEOPLE_ID = B.RELATIVE_ID) inner join RELATIONSHIP_TYPE C on (C.RELATIONSHIP_TYPE_ID = B.RELATIONSHIP_TYPE_ID) where B.PEOPLE_ID = """ + str(peopleid)

peopleimagequery = """ SELECT PEOPLE_IMAGE_ID, IMAGE_PATH FROM PEOPLE_IMAGES WHERE PEOPLE_ID = """ + str(peopleid)
relatedplacequery = """ SELECT A.NAME_1979, A.LATITUDE, A.LONGITUDE FROM PLACENAMES A, PEOPLE B WHERE A.PLACENAME_ID = B.PLACENAME_ID AND B.PEOPLE_ID = """ + str(peopleid)




#CONNECTIONS TO DATABASE TO EXECUTE PEOPLE QUERIES, QUERIES ARE STORED IN A DICTIONTARY
conn = cx_Oracle.connect(dsn="geosgen", user="s1774346", password=pw)
c = conn.cursor()
c.execute(peopleinfoquery)
peopleinfo={}
for row in c:
        peopleinfo['surname'] = row[0]
        peopleinfo['othernames'] = row[1]
        peopleinfo['maiden_name'] = row[2]
        peopleinfo['status'] = row[3]
        peopleinfo['buried_at'] = row[4]
        peopleinfo['reference'] = row[5]
        peopleinfo['supplementary'] = row[6]
        peopleinfo['supplementarycontd'] = row[7]
        peopleinfo['age'] = row[8]
        peopleinfo['year_born'] = row[9]
        peopleinfo['year_married'] = row[10]
        peopleinfo['year_died'] = row[11]
        peopleinfo['gender'] = row[12]
        peopleinfo['birthplace'] = row[13]
        peopleinfo['parish'] = row[14]

#CONNECTIONS TO DATABASE TO EXECUTE FAMILY INFO QUERIES, RESULTS ARE APPENDED TO A LIST
c.execute(familyinfoquery)        
familyinfos=[]
for row in c:
        familyinfos.append([row[0],row[1], row[2]])
        

c.execute(peopleimagequery)
#CONNECTIONS TO DATABASE TO EXECUTE QUERIES, QUERIES ARE STORED IN A DICTIONARY
images =[]
for row in c:
        image = {}
        image['imageid'] = row[0]
        image['imagepath'] = row[1]
        images.append(image)
        
    

c.execute(relatedplacequery)        
relatedplaces=[]
for row in c:
        relatedplaces.append([row[0],row[1], row[2]])




#This stores the responses in a dictionary
result = {}

result['peopleinfo'] = peopleinfo
result['familyinfos'] = familyinfos
result['images'] = images
result['relatedplaces'] = relatedplaces

#This returns the output as JSON
sys.stdout.write("Content-Type: application/json")
sys.stdout.write("\n")
sys.stdout.write("\n")



sys.stdout.write(json.dumps(result,indent=1))

sys.stdout.write("\n")

sys.stdout.close()

#!/usr/bin/env python3


import cgi
import cgitb
import sys
import json
import cx_Oracle

cgitb.enable()


# THE FIELD STORAGE INTERACTS WITH THE CLIENT SIDE
fs = cgi.FieldStorage()

with open("../../password.txt", 'r') as pwf:
	pw=pwf.read().strip()

pid=0
if 'pid' in fs:
	pid=fs['pid'].value

#SQL QUERIES, RESULTS ARE RETURNED TO AJAX

placeinfoquery = """ 
SELECT coalesce(OLD_NAME,'Unknown'), coalesce(NAME_1979, 'Unknown') , coalesce(MEANING, 'Unknown') , coalesce(DESCRIPTION,'Unknown'), coalesce(DBMS_LOB.substr(COMMENTS),'Unknown'),  EASTING, NORTHING,coalesce(cast(SURVEY as varchar(19)), 'Unknown'), LATITUDE, LONGITUDE, SHEET_NUMBER, coalesce(DBMS_LOB.substr(SUPPLEMENTARY, 3000), 'Unavailable'), coalesce(DBMS_LOB.substr(SUPPLEMENTARY, 3000, 3001), ' ') FROM PLACENAMES WHERE PLACENAME_ID = """ + str(pid)

ownerquery = """ SELECT NAME, coalesce(TITLE,'Unknown'), coalesce(HOUSE,'Unknown'), coalesce(cast(YEAR as varchar(19)), 'Unknown') FROM OWNER WHERE PLACENAME_ID = """ + str(pid)

placeimagequery = """ SELECT PLACENAME_IMAGE_ID, IMAGE_PATH FROM PLACENAME_IMAGES WHERE PLACENAME_ID = """ + str(pid)

archaeologyquery = """ SELECT coalesce(NMRS_SITE_NUM,'Unknown'), coalesce(GRID_REFERENCE,'Unknown'), coalesce(DBMS_LOB.substr(ARCHAEOLOGICAL_NOTES, 3000),'Unknown'), coalesce(DBMS_LOB.substr(ARCHAEOLOGICAL_NOTES, 3000, 3001),' ') FROM ARCHAEOLOGY WHERE PLACENAME_ID = """ + str(pid)

originquery = """ SELECT ORIGIN_ID, coalesce(ORIGIN,'Unknown') FROM ORIGIN WHERE PLACENAME_ID = """ + str(pid)


authorityquery = """ SELECT coalesce(NAME,'Unknown'), coalesce(TITLE,'Unknown'), coalesce(PLACE_OF_RESIDENCE,'Unknown') FROM AUTHORITY WHERE PLACENAME_ID = """ + str(pid)
 




#CONNECTIONS TO DATABASE TO EXECUTE OWNER TABLE  QUERIES
conn = cx_Oracle.connect(dsn="geosgen", user="s1774346", password=pw)
c = conn.cursor()
c.execute(ownerquery)

owners=[]
for row in c:
        owner = {}
        owner['name'] = row[0]
        owner['title'] = row[1]
        owner['house'] = row[2]
        owner['year'] = row[3]
        owners.append(owner)
    
#CONNECTIONS TO DATABASE TO EXECUTE PLACENAME_IMAGES TABLE  QUERIES    
c.execute(placeimagequery)

images =[]
for row in c:
        image = {}
        image['imageid'] = row[0]
        image['imagepath'] = row[1]
        images.append(image)

#CONNECTIONS TO DATABASE TO EXECUTE PLACENAME TABLE  QUERIES
c.execute(placeinfoquery)
placeinfo={}
for row in c:
        placeinfo['old_name'] = row[0]
        placeinfo['name_1979'] = row[1]
        placeinfo['meaning'] = row[2]
        placeinfo['description'] = row[3]
        placeinfo['comments'] = row[4]
        placeinfo['easting'] = row[5]
        placeinfo['northing'] = row[6]
        placeinfo['survey'] = row[7]
        placeinfo['latitude'] = row[8]
        placeinfo['longitude'] = row[9]
        placeinfo['sheet_number'] = row[10]
        placeinfo['supplementary'] = row[11]
        placeinfo['supplementarycontd'] = row[12]
       

c.execute(archaeologyquery)

#CONNECTIONS TO DATABASE TO EXECUTE ARCHAEOLOGICAL TABLE  QUERIES
archaeological = []
for row in c:
		archaeology = {}	
		archaeology['NMRS'] = row[0]
		archaeology['grid_reference'] = row[1]
		archaeology['notes'] = row[2]
		archaeology['notes2'] = row[3]
		archaeological.append(archaeology)


c.execute(authorityquery)

authorities = []
for row in c:
		authority = {}	
		authority['name'] = row[0]
		authority['title'] = row[1]
		authority['residence'] = row[2]
		authorities.append(authority)


 #CONNECTIONS TO DATABASE TO EXECUTE ORIGIN TABLE QUERIES               
c.execute(originquery)
origins=[]
for row in c:
		origin = {}
		origin['originid'] = row[0]
		origin['origintype'] = row[1]
		origins.append(origin)


#This stores the responses in a dictionary
result = {}

result['owners'] = owners
result['images'] = images
result['placeinfo'] = placeinfo
result['archaeological'] = archaeological
result['origins'] = origins
result['authorities'] = authorities


sys.stdout.write("Content-Type: application/json")
sys.stdout.write("\n")
sys.stdout.write("\n")


#This returns the output as JSON
sys.stdout.write(json.dumps(result,indent=1))

sys.stdout.write("\n")

sys.stdout.close()




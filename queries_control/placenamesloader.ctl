LOAD DATA
INFILE place.dat  
REPLACE CONTINUEIF LAST != '|'
INTO TABLE PLACENAMES
FIELDS TERMINATED BY '|' 
TRAILING NULLCOLS
(PLACENAME_ID, OLD_NAME, NAME_1979, MEANING, COMMENTS CHAR (100000), SHEET_NUMBER, EASTING,NORTHING, DESCRIPTION, SUPPLEMENTARY CHAR (100000), SURVEY, PARISH, LATITUDE, LONGITUDE)

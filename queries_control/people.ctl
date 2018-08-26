LOAD DATA
INFILE people.dat
REPLACE CONTINUEIF LAST != '|'
INTO TABLE PEOPLE
FIELDS TERMINATED BY '|' 
TRAILING NULLCOLS
(PEOPLE_ID, SURNAME, OTHERNAMES, MAIDEN_NAME, STATUS, BURIED_AT, SUPPLEMENTARY CHAR (300000), REFERENCE, AGE, YEAR_BORN, YEAR_MARRIED, YEAR_DIED, GENDER, BIRTHPLACE, PARISH, SCHEDULE_NUMBER,PLACENAME_ID)
LOAD DATA
INFILE archaeology.dat
REPLACE CONTINUEIF LAST != '|'
INTO TABLE ARCHAEOLOGY
FIELDS TERMINATED BY '|' 
(ARCHAEOLOGY_ID, NMRS_SITE_NUM, GRID_REFERENCE, PLACENAME_ID, ARCHAEOLOGICAL_NOTES  CHAR (100000))

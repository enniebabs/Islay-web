LOAD DATA
INFILE categories.dat
REPLACE
INTO TABLE CATEGORIES
FIELDS TERMINATED BY '|' 
(CATEGORY_ID, CATEGORY_TYPE)
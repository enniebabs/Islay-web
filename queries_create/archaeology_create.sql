CREATE TABLE ARCHAEOLOGY
(ARCHAEOLOGY_ID NUMBER(4) not null,
NMRS_SITE_NUM VARCHAR2(60) null,
GRID_REFERENCE VARCHAR2(60) null,   
PLACENAME_ID NUMBER(4) null,
ARCHAEOLOGICAL_NOTES CLOB null,
PRIMARY KEY (ARCHAEOLOGY_ID),
FOREIGN KEY (PLACENAME_ID) REFERENCES PLACENAMES(PLACENAME_ID)); 
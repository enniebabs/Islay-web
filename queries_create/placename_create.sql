CREATE TABLE PLACENAMES
(PLACENAME_ID NUMBER(4) not null,
OLD_NAME VARCHAR2(60) null,
NAME_1979 VARCHAR2(60) null,
MEANING VARCHAR2(2000) null,
COMMENTS CLOB null,
SHEET_NUMBER  NUMBER(7) null,
EASTING NUMBER(6) null,
NORTHING NUMBER(6) null,
DESCRIPTION  VARCHAR2(100) null,
SUPPLEMENTARY CLOB null,
SURVEY  NUMBER(4) null,
PARISH NUMBER(1) null,
LATITUDE NUMBER null,
LONGITUDE NUMBER null,
PRIMARY KEY (PLACENAME_ID),
FOREIGN KEY (PARISH) REFERENCES PARISH(PARISH_ID)); 

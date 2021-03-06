CREATE TABLE PEOPLE
(PEOPLE_ID NUMBER(6) not null,
SURNAME VARCHAR2(2000) null,
OTHERNAMES VARCHAR2(2000 )null,
MAIDEN_NAME VARCHAR2(1000 )null,
STATUS VARCHAR(20) null,
BURIED_AT VARCHAR(2000) null,
SUPPLEMENTARY CLOB null,
REFERENCE VARCHAR(2000) null,
AGE NUMBER(5) null,
YEAR_BORN NUMBER(4)  null,
YEAR_MARRIED NUMBER(4) null,
YEAR_DIED NUMBER(4) null,
GENDER VARCHAR(60) null,
BIRTHPLACE VARCHAR(2000) null,
PARISH VARCHAR(70) null,
SCHEDULE_NUMBER VARCHAR (2000) null,
PLACENAME_ID NUMBER(4) null,
PRIMARY KEY (PEOPLE_ID),
FOREIGN KEY (PLACENAME_ID) REFERENCES PLACENAMES(PLACENAME_ID)); 

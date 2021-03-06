CREATE TABLE RELATIONSHIP
(RELATIONSHIP_ID NUMBER(5) not null,
PEOPLE_ID NUMBER(5) null,
RELATIVE_ID NUMBER(5) null,
RELATIONSHIP_TYPE_ID NUMBER(5) null,
PRIMARY KEY (RELATIONSHIP_ID),
FOREIGN KEY (PEOPLE_ID) REFERENCES PEOPLE(PEOPLE_ID),
FOREIGN KEY (RELATIVE_ID) REFERENCES PEOPLE(PEOPLE_ID),
FOREIGN KEY (RELATIONSHIP_TYPE_ID) REFERENCES RELATIONSHIP_TYPE(RELATIONSHIP_TYPE_ID)); 

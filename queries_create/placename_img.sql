CREATE TABLE PLACENAME_IMAGES
(PLACENAME_IMAGE_ID NUMBER(4) not null,
IMAGE_PATH VARCHAR2(2000) null,
PLACENAME_ID NUMBER(4) null,
PRIMARY KEY (PLACENAME_IMAGE_ID),
FOREIGN KEY (PLACENAME_ID) REFERENCES PLACENAMES(PLACENAME_ID)); 
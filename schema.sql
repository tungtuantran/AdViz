CREATE TABLE contact (
    contactid   INT PRIMARY KEY AUTO_INCREMENT,
    lastname    VARCHAR(100) NOT NULL,
    firstname   VARCHAR(100) NOT NULL,
    street      VARCHAR(100) NOT NULL,
    zipcode     VARCHAR(100) NOT NULL,
    city        VARCHAR(100) NOT NULL,
    country     VARCHAR(100) NOT NULL,
    isPrivate   TINYINT NOT NULL
);

CREATE TABLE user (
    userid   VARCHAR(100) PRIMARY KEY,
    password    VARCHAR(100) NOT NULL,
    firstname   VARCHAR(100) NOT NULL,
    lastname      VARCHAR(100) NOT NULL,
    isAdmin     TINYINT(1) NOT NULL
);
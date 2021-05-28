CREATE DATABASE DIGITAL_STAR;
CREATE EXTENSION PGCRYPTO;

CREATE TABLE USERS(
  USER_ID SERIAL NOT NULL PRIMARY KEY,
  USER_LOGIN VARCHAR(32) NOT NULL,
  USER_PASSWORD VARCHAR(72) NOT NULL
);

CREATE UNIQUE INDEX USER_LOGIN_IDX ON USERS(LOWER(USER_LOGIN));

CREATE TABLE SLIDES(
  SLIDE_ID SERIAL NOT NULL PRIMARY KEY,
  SLIDE_TITLE VARCHAR(256) NOT NULL,
  SLIDE_SUBTITLE VARCHAR(128) NOT NULL,
  SLIDE_IMG_SRC VARCHAR(4096) NOT NULL,
  SLIDE_TIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BLOGS(
  BLOG_ID SERIAL NOT NULL PRIMARY KEY,
  BLOG_TITLE VARCHAR(512) NOT NULL,
  BLOG_IMAGE VARCHAR(4096) NOT NULL,
  BLOG_THEME VARCHAR(64) NOT NULL,
  BLOG_CONTENT JSON NOT NULL,
  BLOG_AUTHOR VARCHAR(128) NOT NULL,
  BLOG_AUTHOR_PICTURE VARCHAR(4096),
  BLOG_AUTHOR_LINK VARCHAR(4096),
  BLOG_READING_TIME INT NOT NULL,
  BLOG_LIKE INT DEFAULT 0,
  BLOG_TAGS TEXT[],
  BLOG_SITE_LINK VARCHAR(512) NOT NULL,
  BLOG_CREATED TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE FAQ(
  FAQ_ID SERIAL NOT NULL PRIMARY KEY,
  FAQ_QUESTION VARCHAR(512) NOT NULL,
  FAQ_ANSWER VARCHAR(2048) NOT NULL,
  FAQ_CREATED TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MEMBERS(
  MEMBER_ID SERIAL NOT NULL PRIMARY KEY,
  MEMBER_IMG VARCHAR(4096) NOT NULL,
  MEMBER_TIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)
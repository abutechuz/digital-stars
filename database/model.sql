CREATE database digital_star with owner 'postgres' encoding 'utf8';
CREATE extension pgcrypto;

CREATE domain login as varchar(32) check(value~ * '^@?(\w){4,32}$');

CREATE table users(
  user_id serial not null primary key,
  user_login login not null,
  user_password varchar(72) not null
);


CREATE unique index user_login_idx on users(lower(user_login));

CREATE table slides(
  slide_id serial not null primary key,
  slide_title varchar(256) not null,
  slide_subtitle varchar(128) not null,
  slide_time timestamp not null
  default current_timestamp,
  slide_img_src varchar(4096) not null
);

CREATE table blogs(
  blog_id serial not null primary key,
  blog_title varchar(512) not null,
  blog_image varchar(4096) not null,
  blog_content json not null,
  blog_author varchar(128) not null,
  blog_author_picture varchar(4096),
  blog_author_link varchar(4096),
  blog_reading_time int not null,
  blog_like int
  default 0,
  blog_tags text[],
  blog_CREATEd TIMESTAMP with time zone
  default current_timestamp
);

CREATE TABLE faq(
  faq_id serial not null primary key,
  faq_question varchar(512) not null,
  faq_answer varchar(2048) not null,
  faq_CREATEd TIMESTAMP with time zone
  default current_timestamp
);

CREATE table members(
    member_id serial not null primary key,
    member_img varchar(4096) not null,
    member_time timestamp not null
    default current_timestamp
  )

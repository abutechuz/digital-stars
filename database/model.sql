create database starter with owner 'postgres' encoding 'utf8';
create extension pgcrypto;

create table users(
  user_id serial not null primary key,
  user_login VARCHAR(255) not null,
  user_password varchar(72) not null
);

create unique index user_login_idx on users(lower(user_login));


create table blogs(
  blog_id serial not null primary key,
  blog_title varchar(512) not null,
  blog_image varchar(4096) not null,
  blog_content json not null,
  blog_author varchar(128) not null,
  blog_author_picture varchar(4096),
  blog_author_link varchar(4096),
  blog_reading_time int not null,
  blog_like int default 0,
  blog_tags text[],
  blog_created TIMESTAMP with time zone default current_timestamp
);

create TABLE faq(
  faq_id serial not null primary key,
  faq_question varchar(512) not null,
  faq_answer varchar(2048) not null,
  faq_created  TIMESTAMP with time zone default current_timestamp
);

create table info(
  id serial not null primary key,
  info json not null
);

------------------

insert into blogs(
  blog_title,
  blog_image,
  blog_content,
  blog_author,
  blog_author_picture,
  blog_author_link,
  blog_reading_time,
  blog_tags,
  blog_like
) values (
  'title',
  'image.png',
  '{ "jsj": "json"}',
  'authorbek',
  'author-image.png',
  'htpps://ssdasd/asd/asd',
  200,
  '{"hello", "web", "asd"}',
  1
)
;

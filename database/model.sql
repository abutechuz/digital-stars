create database starter with owner 'postgres' encoding 'utf8';
create extension pgcrypto;

create table users(
  user_id serial not null primary key,
  user_login VARCHAR(255) not null,
  user_password varchar(72) not null
);

create unique index user_login_idx on users(lower(user_login));

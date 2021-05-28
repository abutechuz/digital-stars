let {
  fetch,
  fetchOne
} = require("../library/database/postgres")

let read = require("reading-time")

const getBlogs = async ({
  query: {
    page,
    limit
  }
}) => {

  const SQL = `
  select * from blogs
  order by blog_id desc
  offset ($1 - 1) * $2 fetch next $2 rows only ;
  `

  const blogs = await fetch(SQL, page, limit)

  return blogs
};

const getById = async ({
  body: {
    is_head,
    blog_site_link
  }
}) => {
  const SQL = `select * from blogs where blog_site_link=$1`

  const blog = await fetchOne(SQL, blog_site_link)

  return {
    ...blog,
    is_head: is_head || null
  }
}

const insertBlog = async ({
  body: {
    blog_title,
    blog_content,
    blog_author,
    blog_author_link,
    blog_tags,
    blog_text,
    blog_theme
  }
}, blog_image, blog_author_picture) => {
  const SQL = `insert into blogs (
    blog_title,
    blog_image,
    blog_content,
    blog_author,
    blog_author_picture,
    blog_author_link,
    blog_tags,
    blog_reading_time,
    blog_theme,
    blog_site_link
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *`
  let clean = require('get-clean-string')()
  const response = await fetchOne(SQL,
    blog_title,
    blog_image,
    blog_content,
    blog_author,
    blog_author_picture || null,
    blog_author_link || null,
    JSON.parse(blog_tags).map(str => str.replace(/[|&;$%@"#<>()+,-]/g, '')) || [],
    read(blog_text).time,
    blog_theme,
    clean(blog_title , '-')
  )

  return response
}

const setBlog = async ({
  body: {
    blog_title,
    blog_content,
    blog_author,
    blog_author_link,
    blog_tags,
    blog_text,
    blog_theme,
    blog_id
  }
}, blog_image, blog_author_picture) => {
  let clean = require('get-clean-string')()
  const SQL = `update blogs set blog_title=$1 ,
  blog_image=$2 ,
  blog_content=$3 ,
  blog_author=$4 ,
  blog_author_picture=$5,
  blog_author_link=$6,
  blog_tags=$7,
  blog_reading_time=$8 , blog_theme=$9 ,  blog_site_link=$11 where blog_id=$10 returning *`
  const res = await fetchOne(SQL,
    blog_title,
    blog_image,
    JSON.parse(blog_content),
    blog_author,
    blog_author_picture || null,
    blog_author_link || null,
    JSON.parse(blog_tags).map(str => str.replace(/[|&;$%@"#<>()+,-]/g, "")) || [],
    read(blog_text).time,
    blog_theme,
    blog_id,
    clean(blog_title , '-')
  )

  return res
}


const deleteBlog = async ({
  body: {
    blog_id
  }
}) => {

  const SQL = `DELETE FROM blogs WHERE blog_id=$1 returning *;`

  const blog = await fetchOne(SQL, blog_id)

  return blog
}

module.exports = {
  getBlogs,
  insertBlog,
  getById,
  setBlog,
  deleteBlog
}
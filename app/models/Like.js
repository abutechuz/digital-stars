let {
  fetch,
  fetchOne
} = require("../Library/database/postgres")

const insertLike = async ({
  body: {
    blog_id
  },cookie : {
    is_liked
  }
}) => {
  
  const SQL_BLOG_ID = `select * from blogs where blog_id=$1`
  
  if(is_liked && await(fetchOne(SQL_BLOG_ID))){
    const SQL = `update blogs set blog_like=(subquery.blog_like + 1)
    FROM (select blog_like from blogs where blog_id = $1) AS subquery
    where blog_id=$1 returning *`
    
    const response = await fetchOne(SQL, blog_id)
    
    return response
  }else{
    return {
      error : "Blog is not defined or you're liked this blog"
    }
  }
  
}

const deleteLike = async ({
  body: {
    blog_id
  }
}) => {
  
  const SQL = `update blogs set blog_like=(
    CASE WHEN subquery.blog_like=0 THEN 0
    WHEN subquery.blog_like > 0 then subquery.blog_like - 1
    END)
    FROM (select blog_like from blogs where blog_id = $1) AS subquery
    where blog_id=$1 returning *`
    
    const blog = await fetchOne(SQL, blog_id)
    
    return blog
  }
  
  module.exports = {
    insertLike,
    deleteLike
  }
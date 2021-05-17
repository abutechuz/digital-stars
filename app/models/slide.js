let { fetch, fetchOne } = require("../library/database/postgres")

let read = require("reading-time")

const getSlides = async () => {
  const SQL = `
  select * from slides
  order by slide_id desc
  `

  const slides = await fetch(SQL)

  return slides
};

const insertSlide = async ({
  body: {
    slide_title,
    slide_subtitle
  }
}, slide_image_src) => {

  const SQL = `insert into slides ( slide_title, slide_subtitle, slide_img_src ) values ($1,$2,$3) returning *`

  const response = await fetchOne(SQL,slide_title, slide_subtitle , slide_image_src)

  return response
}


const deleteSlide = async ({
  body: {
    slide_id
  }
}) => {

  const SQL = `DELETE FROM slides WHERE slide_id=$1 returning *;`

  const slide = await fetchOne(SQL, slide_id)

  return slide
}

module.exports = {
  getSlides,
  insertSlide,
  deleteSlide
}

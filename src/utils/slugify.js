const slugify = (str) => {
  return str.replace(/[\s|#]+/g, '-').toLowerCase()
}

export const artPieceSlug = ({title, date, media, id}) => {
  return slugify(`${title}-${date}-${media.join('-')}-${id}`)
}

export default slugify

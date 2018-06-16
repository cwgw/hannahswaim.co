const slugify = (str) => str.replace(/\s+/g, '-').toLowerCase()

export const artPieceSlug = ({title, date, media, id}) => slugify(`${title}-${date}-${media.join('-')}-${id}`)

export default slugify

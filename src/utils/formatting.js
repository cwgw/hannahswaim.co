import _upperFirst from 'lodash/upperFirst'

export const acronymize = (str) => str.split(/\s+/).reduce((acc, val) => acc + val.charAt(0), '')

export const formatArtMediaString = (media) => {
  const mediaArray = Array.isArray(media)
    ? media
    : typeof media === 'string'
      ? media.split(/,\s*/gi)
      : null

  if (!mediaArray) {
    return media
  }

  if (mediaArray.length < 1) {
    return ''
  }

  if (mediaArray.length === 1) {
    return `${_upperFirst(mediaArray[0])}.`
  }

  return mediaArray
    .sort()
    .reduce((acc, val, index, arr) => {
      return index === arr.length - 1
        ? `${acc} and ${val.toLowerCase()}.`
        : index > 0
          ? `${acc}, ${val.toLowerCase()}`
          : _upperFirst(val)
    }, '')
}

export const formatArtDimensions = ({height, width, depth, units}) => {
  if (!(height && width)) {
    return ''
  }
  return depth
    ? `${height} × ${width} × ${depth} ${units}.`
    : `${height} × ${width} ${units}.`
}

export const formatArtTitle = ({title, date}) => {
  return date
    ? `${title}, ${date}`
    : title
}

export const formatArtMeta = ({title, date, media, dimensions}) => {
  return {
    title: formatArtTitle({title, date}),
    media: formatArtMediaString(media),
    dimensions: formatArtDimensions(dimensions),
  }
}
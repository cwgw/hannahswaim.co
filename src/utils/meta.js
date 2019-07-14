const meta = ({ description, image, location, title }) => {
  let tags = [];
  if (title) {
    tags = tags.concat([
      { property: 'og:title', content: title },
      { name: 'twitter:title', content: title },
    ]);
  }
  if (description) {
    tags = tags.concat([
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
    ]);
  }
  if (image) {
    tags = tags.concat([
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '880px' },
      { property: 'og:image:height', content: '880px' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: image },
    ]);
    if (description) {
      tags.push({ property: 'og:image:alt', content: description });
    }
  }
  if (location) {
    tags.push({ property: 'og:url', content: location.pathname });
  }
  return tags;
};

export { meta };

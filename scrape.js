const cheerio = require('cheerio');
const fs = require('fs-extra');
const get = require('lodash/get');
const request = require('request');

const download = require(`./utils/download-file`);

const username = process.argv[2]

if (!username) {
  console.log(
    `
You didn't supply an Instagram username!
Run this command like:

node scrape.js INSTAGRAM_USERNAME
    `
  )
  process.exit()
}

const posts = [];

const bail = (err) => {
  console.error(err);
  process.exit(0);
  return false;
}

const toISO8601 = timestamp => new Date(timestamp * 1000).toJSON()

const saveJSON = () => fs.writeFileSync(`./data/instagramPosts.json`, JSON.stringify(posts, ``, 2))

fs.ensureDirSync('./data/images');

const getPosts = () => {
  const url = `https://www.instagram.com/${username}/`;

  request(url, function(err, response, body) {
    if (err) return bail(err);

    const $ = cheerio.load(body);
    let obj;

    try {
      let data = $('script:not([src])')
        .filter((i, el) => (/^window._sharedData\s+\=/).test(el.children[0].data))
        .get(0)
        .children[0]
        .data
        .match(/\{(.|[\r\n])*\}/g);

      obj = JSON.parse(data[0]);
    } catch(err) {
      return bail(err);
    }

    const edges = get(obj, 'entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges', [])

    const images = edges
      .map(({
        node: {
          id,
          shortcode,
          dimensions,
          display_url,
          taken_at_timestamp,
          ...node
        }
      }) => node.isVideo
        ? null
        : {
        id,
        shortcode,
        time: toISO8601(taken_at_timestamp),
        url: `https://www.instagram.com/p/${shortcode}`,
        media: display_url,
        image: `images/${shortcode}.jpg`,
      })
      .forEach((item) => {
        if (!item) return;
        download(item.media, `./data/images/${item.shortcode}.jpg`);
        posts.push(item);
      });

    saveJSON();
  });
}

getPosts();

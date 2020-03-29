const sqlite = require('sqlite3').verbose();
const curl = require('curl');

// 1335064ad9cf341689d2332ea3e56b21d783051d
const baseURL = 'http://api-public.guidebox.com/v2/';
const API_KEY = 'api_key=051a88232225f94af2cd26fd1b6761a8b25e7be6';

const database = new sqlite.Database('./database/guidebox.db');

const createShowsTable = () => {

};

module.exports = {
  shows: {
    all: (limit, offset) => {
      if (!limit) { limit = '10'; }
      if (!offset) { offset = '0'; }
      const url = baseURL + 'shows?' + API_KEY + '&limit=' + limit + '&offset=' + offset;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    channels: (channels, limit, offset) => {
      if (!limit) { limit = '10'; }
      if (!offset) { offset = '0'; }
      const url = baseURL + 'shows?' + API_KEY + '&channel=' + channels + '&limit=' + limit + '&offset=' + offset;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    sources: (sources, limit, offset) => {
      if (!limit) { limit = '10'; }
      if (!offset) { offset = '0'; }
      const url = baseURL + 'shows?' + API_KEY + '&source=' + sources + '&limit=' + limit + '&offset=' + offset;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    platforms: (platforms, limit, offset) => {
      if (!limit) { limit = '10'; }
      if (!offset) { offset = '0'; }
      const url = baseURL + 'shows?' + API_KEY + '&platform=' + platforms + '&limit=' + limit + '&offset=' + offset;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    tags: (tags, limit, offset) => {
      if (!limit) { limit = '10'; }
      if (!offset) { offset = '0'; }
      const url = baseURL + 'shows?' + API_KEY + '&tag=' + tags + '&limit=' + limit + '&offset=' + offset;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    }
  },
  show: {
    id: (id) => {
      const url = baseURL + 'shows/' + id + '?' + API_KEY;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    season: (id) => {
      const url = baseURL + 'shows/' + id + '/seasons?' + API_KEY;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    episodes: {
      all: (id, links) => {
        const url = baseURL + 'shows/' + id + '/episodes?' + API_KEY + '&include_links=' + links;
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      },
      season: (id, seasonId, links) => {
        const url = baseURL + 'shows/' + id + '/episodes?' + API_KEY + '&season=' + seasonId + '&include_links=' + links;
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      },
      sources: (id, sources, links) => {
        const url = baseURL + 'shows/' + id + '/episodes?' + API_KEY + '&sources=' + sources + '&include_links=' + links;
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      },
      platforms: (id, platforms, links) => {
        const url = baseURL + 'shows/' + id + '/episodes?' + API_KEY + '&platform=' + platforms + '&include_links=' + links;
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      }
    },
    images: {
      all: (id) => {
        const url = baseURL + 'shows/' + id + '/images?' + API_KEY;
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      },
      thumbnails: (id) => {
        const url = baseURL + 'shows/' + id + '/images?' + API_KEY + '&filter=thumbnails';
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      },
      posters: (id) => {
        const url = baseURL + 'shows/' + id + '/images?' + API_KEY + '&filter=posters';
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      },
      banners: (id) => {
        const url = baseURL + 'shows/' + id + '/images?' + API_KEY + '&filter=banners';
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      },
      backgrounds: (id) => {
        const url = baseURL + 'shows/' + id + '/images?' + API_KEY + '&filter=backgrounds';
        curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
        })
      }
    },
    related: (id) => {
      const url = baseURL + 'shows/' + id + '/related?' + API_KEY;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    available: (id) => {
      const url = baseURL + 'shows/' + id + '/available_content?' + API_KEY;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    }
  },
  movies: {
    all: () => {
      const url = baseURL + 'movies?' + API_KEY;
      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
  }
};

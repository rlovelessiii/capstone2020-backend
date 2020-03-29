const sqlite = require('sqlite3').verbose();
const curl = require('curl');

// 1335064ad9cf341689d2332ea3e56b21d783051d
const baseURL = 'http://api-public.guidebox.com/v2/';
const API_KEY = '?api_key=051a88232225f94af2cd26fd1b6761a8b25e7be6';

const database = new sqlite.Database('./database/guidebox.db');

const createShowsTable = () => {

};

module.exports = {
  shows: {
    all: (channels, offset, limit, sources, platform, tags) => {
      if (!channels) { channels = 'online,television'; }
      if (!offset) { offset = '0'; }
      if (!limit) { limit = '25'; }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase'; }
      if (!platform) { platform = 'ios,android,web'; }
      if (!tags) { tags = '' }

      const url = baseURL + 'shows' + API_KEY +
        '&channel=' + channels +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platform +
        '&tags=' + tags;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    id: (show_id, channels, offset, limit, sources, platform) => {
      if (!channels) { channels = 'online,television'; }
      if (!offset) { offset = '0'; }
      if (!limit) { limit = '25'; }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase'; }
      if (!platform) { platform = 'ios,android,web'; }

      const url = baseURL + 'shows/' + show_id + API_KEY +
        '&channel=' + channels +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platform;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    season: (show_id, channels, offset, limit, sources, platform) => {
      if (!channels) { channels = 'online,television'; }
      if (!offset) { offset = '0'; }
      if (!limit) { limit = '25'; }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase'; }
      if (!platform) { platform = 'ios,android,web'; }

      const url = baseURL + 'shows/' + show_id + '/seasons' + API_KEY +
        '&channel=' + channels +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platform;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    episodes: (show_id, seasons, offset, limit, sources, platform, include_links, reverse_ordering) => {
      if (!seasons) { seasons = '' }
      if (!offset) { offset = '0'; }
      if (!limit) { limit = '25'; }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase'; }
      if (!platform) { platform = 'ios,android,web'; }
      if (!include_links) { include_links = false; }
      if (!reverse_ordering) { reverse_ordering = false; }

      const url = baseURL + 'shows/' + show_id + '/episodes' + API_KEY +
        '&season=' + seasons +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platform +
        '&include_links=' + include_links +
        '&reverse_ordering=' + reverse_ordering;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    images: (show_id, filter) => {
      if (!filter) { filter = 'thumbnails,posters,banners,backgrounds'; }

      const url = baseURL + 'shows/' + show_id + '/images' + API_KEY +
        '&filter=' + filter;

      curl.getJSON(url, (err, res, body) => {
          if (err) console.log(err);
          console.log(res);
          console.log(body);
      })
    },
    related: (show_id) => {
      const url = baseURL + 'shows/' + show_id + '/related' + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    available_content: (show_id) => {
      const url = baseURL + 'shows/' + show_id + '/available_content' + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    }
  },
  episodes: {
    details: (episode_id) => {
      const url = baseURL + 'episodes/' + episode_id + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    images: (episode_id) => {
      const url = baseURL + 'episodes/' + episode_id + 'images' + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    }
  },
  movies: {
    all: (offset, limit, sources, platform, include_preorders, include_in_theaters) => {
      if (!offset) { offset = '0' }
      if (!limit) { limit = '25' }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase' }
      if (!platform) { platform = 'ios,android,web' }
      if (!include_preorders) { include_preorders = false }
      if (!include_in_theaters) { include_in_theaters = false }

      const url = baseURL + 'movies' + API_KEY +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platform +
        '&include_preorders=' + include_preorders +
        '&include_in_theaters=' + include_in_theaters;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    details: (movie_id) => {
      const url = baseURL + 'movies/' + movie_id + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    images: (movie_id, filter) => {
      if (!filter) { filter = 'thumbnails,posters,banners,backgrounds' }

      const url = baseURL + 'movies/' + movie_id + '/images' + API_KEY +
        '&filter=' + filter;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    trailers: (movie_id, offset, limit, sources) => {
      if (!offset) { offset = '0' }
      if (!limit) { limit = '10' }
      if (sources) { sources = 'youtube,guidebox'}

      const url = baseURL + 'movies/' + movie_id + '/videos' + API_KEY +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    related: (movie_id) => {
      const url = baseURL + 'movies/' + movie_id + '/related' + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    }
  },
  channels: {
    list: (type, offset, limit) => {
      if (!type) { type = 'online,television' }
      if (!offset) { offset = '0' }
      if (!limit) { limit = '25' }

      const url = baseURL + 'channels' + API_KEY +
        '&type=' + type +
        '&offset=' + offset +
        '&limit=' + limit;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    details: (channel_id) => {
      const url = baseURL + 'channels/' + channel_id + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    images: (channel_id) => {
      const url = baseURL + 'channels/' + channel_id + '/images' + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    }
  },
  sources: (type, filter) => {
    if (!type) { type = 'free,subscription,purchase,tv_everywhere' }
    if (!filter) { filter = 'movie,show' }

    const url = baseURL + 'sources' + API_KEY +
      '&type=' + type +
      '&filter=' + filter;

    curl.getJSON(url, (err, res, body) => {
      if (err) console.log(err);
      console.log(res);
      console.log(body);
    })
  },
  genres: () => {
    const url = baseURL + 'genres' + API_KEY;

    curl.getJSON(url, (err, res, body) => {
      if (err) console.log(err);
      console.log(res);
      console.log(body);
    })
  },
  tags: (offset, limit) => {
    if (!offset) { offset = '0' }
    if (!limit) { limit = '25' }

    const url = baseURL + 'tags' + API_KEY +
      '&offset=' + offset +
      '&limit=' + limit;

    curl.getJSON(url, (err, res, body) => {
      if (err) console.log(err);
      console.log(res);
      console.log(body);
    })
  },
  person: {
    id: (person_id) => {
      const url = baseURL + 'person/' + person_id + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    images: (person_id) => {
      const url = baseURL + 'person/' + person_id + '/images' + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    credits: (person_id, role, type) => {
      if (!role) { role = 'cast,crew' }
      if (!type) { type = 'movie,show' }

      const url = baseURL + 'person/' + person_id + '/credits' + API_KEY +
        '&role=' + role +
        '&type=' + type;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    }
  }
};

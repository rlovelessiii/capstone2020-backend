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
    all: (channels, offset, limit, sources, platforms, tags) => {
      if (!channels) { channels = 'online,television'; }
      if (!offset) { offset = '0'; }
      if (!limit) { limit = '25'; }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase'; }
      if (!platforms) { platforms = 'ios,android,web'; }
      if (!tags) { tags = '' }

      const url = baseURL + 'shows' + API_KEY +
        '&channel=' + channels +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platforms +
        '&tags=' + tags;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    id: (show_id, channels, offset, limit, sources, platforms) => {
      if (!channels) { channels = 'online,television'; }
      if (!offset) { offset = '0'; }
      if (!limit) { limit = '25'; }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase'; }
      if (!platforms) { platforms = 'ios,android,web'; }

      const url = baseURL + 'shows/' + show_id + API_KEY +
        '&channel=' + channels +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platforms;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    season: (show_id, channels, offset, limit, sources, platforms) => {
      if (!channels) { channels = 'online,television'; }
      if (!offset) { offset = '0'; }
      if (!limit) { limit = '25'; }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase'; }
      if (!platforms) { platforms = 'ios,android,web'; }

      const url = baseURL + 'shows/' + show_id + '/seasons' + API_KEY +
        '&channel=' + channels +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platforms;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    episodes: (show_id, seasons, offset, limit, sources, platforms, include_links, reverse_ordering) => {
      if (!seasons) { seasons = '' }
      if (!offset) { offset = '0'; }
      if (!limit) { limit = '25'; }
      if (!sources) { sources = 'free,tv_everywhere,subscription,purchase'; }
      if (!platforms) { platforms = 'ios,android,web'; }
      if (!include_links) { include_links = false; }
      if (!reverse_ordering) { reverse_ordering = false; }

      const url = baseURL + 'shows/' + show_id + '/episodes' + API_KEY +
        '&season=' + seasons +
        '&offset=' + offset +
        '&limit=' + limit +
        '&sources=' + sources +
        '&platform=' + platforms +
        '&include_links=' + include_links +
        '&reverse_ordering=' + reverse_ordering;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    images: (show_id, filters) => {
      if (!filters) { filters = 'thumbnails,posters,banners,backgrounds'; }

      const url = baseURL + 'shows/' + show_id + '/images' + API_KEY +
        '&filter=' + filters;

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
  episode: {
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
    }
  }
};

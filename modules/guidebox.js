const curl = require('curl');

// 1335064ad9cf341689d2332ea3e56b21d783051d
const BASE_URL = 'http://api-public.guidebox.com/v2/';
const API_KEY = '?api_key=051a88232225f94af2cd26fd1b6761a8b25e7be6';

// Guidebox endpoints
const SHOWS_ENDPOINT = 'shows';
const EPISODES_ENDPOINT = 'episodes';
const MOVIES_ENDPOINT = 'movies';

// Guidebox Parameters
const CHANNEL_PARAM = '&channel=';
const OFFSET_PARAM = '&offset=';
const LIMIT_PARAM = '&limit=';
const SOURCES_PARAM = '&sources=';
const PLATFORM_PARAM = '&platform=';
const TAGS_PARAM = '&tags=';
const SEASON_PARAM = '&season=';
const INCLUDE_LINKS_PARAM = '&include_links=';
const REVERSE_ORDERING_PARAM = '&reverse_ordering=';
const FILTER_PARAM = '&filter=';
const INCLUDE_PREORDERS_PARAM = '&include_preorders=';
const INCLUDE_IN_THEATERS_PARAM = '&include_in_theaters=';

// Guidebox default attribute values
const CHANNEL = 'all';
const OFFSET = '0';
const LIMIT = '25';
const SOURCES = 'all';
const PLATFORM = 'all';
const TAGS = '';
const INCLUDE_LINKS = 'false';
const REVERSE_ORDERING = 'false';
const FILTER = 'all';
const INCLUDE_PREORDERS = 'false';
const INCLUDE_IN_THEATERS = 'false';
// testing values
const SHOW_ID = '59077';
const SEASON = '1';
const EPISODE_ID = '10172854';
const MOVIE_ID = '173891';

function processResponse(err, res, body) {
  if (err) console.log(err);
  console.log(body);
}

module.exports = {
  // '/shows' endpoints
  shows: {
    all: (channel=CHANNEL, offset=OFFSET, limit=LIMIT, sources=SOURCES, platform=PLATFORM, tags=TAGS) => {

      const url = BASE_URL + SHOWS_ENDPOINT + API_KEY +
        CHANNEL_PARAM + channel +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform +
        TAGS_PARAM + tags;

      curl.getJSON(url, processResponse);
    },
    id: (show_id=SHOW_ID, channel=CHANNEL, offset=OFFSET, limit=LIMIT, sources=SOURCES, platform=PLATFORM) => {

      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + API_KEY +
        CHANNEL_PARAM + channel +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform;

      curl.getJSON(url, processResponse)
    },
    season: (show_id=SHOW_ID, channel=CHANNEL, offset=OFFSET, limit=LIMIT, sources=SOURCES, platform=PLATFORM) => {

      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/seasons' + API_KEY +
        CHANNEL_PARAM + channel +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform;

      curl.getJSON(url, processResponse);
    },
    episodes: (show_id=SHOW_ID, season=SEASON, offset=OFFSET, limit=LIMIT, sources=SOURCES, platform=PLATFORM, include_links=INCLUDE_LINKS, reverse_ordering=REVERSE_ORDERING) => {

      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/episodes' + API_KEY +
        SEASON_PARAM + season +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform +
        INCLUDE_LINKS_PARAM + include_links +
        REVERSE_ORDERING_PARAM + reverse_ordering;

      curl.getJSON(url, processResponse);
    },
    images: (show_id=SHOW_ID, filter=FILTER) => {

      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/images' + API_KEY +
        FILTER_PARAM + filter;

      curl.getJSON(url, processResponse);
    },
    related: (show_id=SHOW_ID) => {

      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/related' + API_KEY;

      curl.getJSON(url, processResponse);
    },
    available_content: (show_id=SHOW_ID) => {

      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/available_content' + API_KEY;

      curl.getJSON(url, processResponse);
    }
  },
  // '/episodes' endpoints
  episodes: {
    details: (episode_id=EPISODE_ID) => {

      const url = BASE_URL + EPISODES_ENDPOINT + '/' + episode_id + API_KEY;

      curl.getJSON(url, processResponse);
    },
    images: (episode_id=EPISODE_ID) => {

      const url = BASE_URL + EPISODES_ENDPOINT + '/' + episode_id + '/images' + API_KEY;

      curl.getJSON(url, processResponse);
    }
  },
  // '/movies' endpoints
  movies: {
    all: (offset=OFFSET, limit=LIMIT, sources=SOURCES, platform=PLATFORM, include_preorders=INCLUDE_PREORDERS, include_in_theaters=INCLUDE_IN_THEATERS) => {

      const url = BASE_URL + MOVIES_ENDPOINT + API_KEY +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform +
        INCLUDE_PREORDERS_PARAM + include_preorders +
        INCLUDE_IN_THEATERS_PARAM + include_in_theaters;

      curl.getJSON(url, processResponse);
    },
    details: (movie_id=MOVIE_ID) => {

      const url = BASE_URL + MOVIES_ENDPOINT + '/' + movie_id + API_KEY;

      curl.getJSON(url, processResponse);
    },
    images: (movie_id=MOVIE_ID, filter=FILTER) => {

      const url = BASE_URL + MOVIES_ENDPOINT + '/' + movie_id + '/images' + API_KEY +
        FILTER_PARAM + filter;

      curl.getJSON(url, processResponse);
    },
    trailers: (movie_id=MOVIE_ID, offset=OFFSET, limit=LIMIT, sources=SOURCES) => {

      const url = BASE_URL + MOVIES_ENDPOINT + '/' + movie_id + '/videos' + API_KEY +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources;

      curl.getJSON(url, processResponse);
    },
    related: (movie_id=MOVIE_ID) => {
      const url = BASE_URL + MOVIES_ENDPOINT + '/' + movie_id + '/related' + API_KEY;

      curl.getJSON(url, processResponse);
    }
  },
  // '/channels' endpoints
  channels: {
    list: (type, offset, limit) => {
      if (!type) { type = 'online,television' }
      if (!offset) { offset = '0' }
      if (!limit) { limit = '25' }

      const url = BASE_URL + 'channels' + API_KEY +
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
      const url = BASE_URL + 'channels/' + channel_id + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    images: (channel_id) => {
      const url = BASE_URL + 'channels/' + channel_id + '/images' + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    }
  },
  // '/sources' endpoints
  sources: (type, filter) => {
    if (!type) { type = 'free,subscription,purchase,tv_everywhere' }
    if (!filter) { filter = 'movie,show' }

    const url = BASE_URL + 'sources' + API_KEY +
      '&type=' + type +
      '&filter=' + filter;

    curl.getJSON(url, (err, res, body) => {
      if (err) console.log(err);
      console.log(res);
      console.log(body);
    })
  },
  // '/genres' endpoints
  genres: () => {
    const url = BASE_URL + 'genres' + API_KEY;

    curl.getJSON(url, (err, res, body) => {
      if (err) console.log(err);
      console.log(res);
      console.log(body);
    })
  },
  // '/tags' endpoints
  tags: (offset, limit) => {
    if (!offset) { offset = '0' }
    if (!limit) { limit = '25' }

    const url = BASE_URL + 'tags' + API_KEY +
      '&offset=' + offset +
      '&limit=' + limit;

    curl.getJSON(url, (err, res, body) => {
      if (err) console.log(err);
      console.log(res);
      console.log(body);
    })
  },
  // '/person' endpoints
  person: {
    id: (person_id) => {
      const url = BASE_URL + 'person/' + person_id + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    images: (person_id) => {
      const url = BASE_URL + 'person/' + person_id + '/images' + API_KEY;

      curl.getJSON(url, (err, res, body) => {
        if (err) console.log(err);
        console.log(res);
        console.log(body);
      })
    },
    credits: (person_id, role, type) => {
      if (!role) { role = 'cast,crew' }
      if (!type) { type = 'movie,show' }

      const url = BASE_URL + 'person/' + person_id + '/credits' + API_KEY +
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

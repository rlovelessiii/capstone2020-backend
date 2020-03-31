const curl = require('curl');

// 1335064ad9cf341689d2332ea3e56b21d783051d 051a88232225f94af2cd26fd1b6761a8b25e7be6
const BASE_URL = 'http://api-public.guidebox.com/v2/';
let API_KEY = '?api_key=';

// Guidebox endpoints
const SHOWS_ENDPOINT = 'shows';
const EPISODES_ENDPOINT = 'episodes';
const MOVIES_ENDPOINT = 'movies';
const CHANNELS_ENDPOINT = 'channels';
const SOURCES_ENDPOINT = 'sources';
const GENRE_ENDPOINT = 'genres';
const TAGS_ENDPOINT = 'tags';
const PERSON_ENDPOINT = 'person';

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
const TYPE_PARAM = '&type=';
const ROLE_PARAM = '&role=';

const defaultParameters = {
  "channel": "all",
  "offset": "0",
  "limit": "25",
  "sources": "all",
  "platform": "all",
  "tags": "",
  "include_links": "false",
  "reverse_ordering": "false",
  "filter": "all",
  "include_preorders": "false",
  "include_in_theaters": "false",
  "type": "all",
  "role": "cast"
};

const devParameters = {
  "show_id": "59077",
  "season": "1",
  "episode_id": "10172854",
  "movie_id": "173891",
  "channel_id": "52",
  "person_id": "287936"
};

module.exports = {
  init: (api_key) => {
    API_KEY += api_key;
  },
  getDefaultParamValues: (callback) => {
    callback(defaultParameters);
  },
  getDevParamValues: (callback) => {
    callback(devParameters);
  },
  // '/shows' endpoints
  shows: {
    all: (channel, offset, limit, sources, platform, tags, callback) => {
      const url = BASE_URL + SHOWS_ENDPOINT + API_KEY +
        CHANNEL_PARAM + channel +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform +
        TAGS_PARAM + tags;

      curl.getJSON(url, callback);
    },
    details: (show_id, callback) => {
      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + API_KEY;
      curl.getJSON(url, callback)
    },
    season: (show_id, channel, offset, limit, sources, platform, callback) => {
      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/seasons' + API_KEY +
        CHANNEL_PARAM + channel +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform;

      curl.getJSON(url, callback);
    },
    episodes: (show_id, season, offset, limit, sources, platform, include_links, reverse_ordering, callback) => {
      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/episodes' + API_KEY +
        SEASON_PARAM + season +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform +
        INCLUDE_LINKS_PARAM + include_links +
        REVERSE_ORDERING_PARAM + reverse_ordering;

      curl.getJSON(url, callback);
    },
    images: (show_id, filter, callback) => {
      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/images' + API_KEY +
        FILTER_PARAM + filter;
      curl.getJSON(url, callback);
    },
    related: (show_id, callback) => {
      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/related' + API_KEY;
      curl.getJSON(url, callback);
    },
    available_content: (show_id, callback) => {
      const url = BASE_URL + SHOWS_ENDPOINT + '/' + show_id + '/available_content' + API_KEY;
      curl.getJSON(url, callback);
    }
  },
  // '/episodes' endpoints
  episodes: {
    details: (episode_id, callback) => {
      const url = BASE_URL + EPISODES_ENDPOINT + '/' + episode_id + API_KEY;
      curl.getJSON(url, callback);
    },
    images: (episode_id, callback) => {
      const url = BASE_URL + EPISODES_ENDPOINT + '/' + episode_id + '/images' + API_KEY;
      curl.getJSON(url, callback);
    }
  },
  // '/movies' endpoints
  movies: {
    all: (offset, limit, sources, platform, include_preorders, include_in_theaters, callback) => {
      const url = BASE_URL + MOVIES_ENDPOINT + API_KEY +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources +
        PLATFORM_PARAM + platform +
        INCLUDE_PREORDERS_PARAM + include_preorders +
        INCLUDE_IN_THEATERS_PARAM + include_in_theaters;

      curl.getJSON(url, callback);
    },
    details: (movie_id, callback) => {
      const url = BASE_URL + MOVIES_ENDPOINT + '/' + movie_id + API_KEY;
      curl.getJSON(url, callback);
    },
    images: (movie_id, filter, callback) => {
      const url = BASE_URL + MOVIES_ENDPOINT + '/' + movie_id + '/images' + API_KEY +
        FILTER_PARAM + filter;
      curl.getJSON(url, callback);
    },
    trailers: (movie_id, offset, limit, sources, callback) => {
      const url = BASE_URL + MOVIES_ENDPOINT + '/' + movie_id + '/videos' + API_KEY +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit +
        SOURCES_PARAM + sources;

      curl.getJSON(url, callback);
    },
    related: (movie_id, callback) => {
      const url = BASE_URL + MOVIES_ENDPOINT + '/' + movie_id + '/related' + API_KEY;
      curl.getJSON(url, callback);
    }
  },
  // '/channels' endpoints
  channels: {
    all: (type, offset, limit, callback) => {
      const url = BASE_URL + CHANNELS_ENDPOINT + API_KEY +
        TYPE_PARAM + type +
        OFFSET_PARAM + offset +
        LIMIT_PARAM + limit;

      curl.getJSON(url, callback);
    },
    details: (channel_id, callback) => {
      const url = BASE_URL + CHANNELS_ENDPOINT + '/' + channel_id + API_KEY;
      curl.getJSON(url, callback);
    },
    images: (channel_id, callback) => {
      const url = BASE_URL + CHANNELS_ENDPOINT + '/' + channel_id + '/images' + API_KEY;
      curl.getJSON(url, callback);
    }
  },
  // '/sources' endpoints
  sources: (type, filter, callback) => {
    const url = BASE_URL + SOURCES_ENDPOINT + API_KEY +
      TYPE_PARAM + type +
      FILTER_PARAM + filter;
    curl.getJSON(url, callback);
  },
  // '/genres' endpoints
  genres: (callback) => {
    const url = BASE_URL + GENRE_ENDPOINT + API_KEY;
    curl.getJSON(url, callback);
  },
  // '/tags' endpoints
  tags: (offset, limit, callback) => {
    const url = BASE_URL + TAGS_ENDPOINT + API_KEY +
      OFFSET_PARAM + offset +
      LIMIT_PARAM + limit;
    curl.getJSON(url, callback);
  },
  // '/person' endpoints
  person: {
    details: (person_id, callback) => {
      const url = BASE_URL + PERSON_ENDPOINT + '/' + person_id + API_KEY;
      curl.getJSON(url, callback);
    },
    images: (person_id, callback) => {
      const url = BASE_URL + PERSON_ENDPOINT + '/' + person_id + '/images' + API_KEY;
      curl.getJSON(url, callback);
    },
    credits: (person_id, role, type, callback) => {
      const url = BASE_URL + PERSON_ENDPOINT + '/' + person_id + '/credits' + API_KEY +
        ROLE_PARAM + role +
        TYPE_PARAM + type;
      curl.getJSON(url, callback);
    }
  }
};

import React, { Component, PureComponent, Fragment } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import './App.css';
import URLInput from './URLInput';
import { API_URL } from './configs';

function createShortenedURL({ url, userId, token }) {
  return fetch(`${API_URL}/users/${userId}/urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url }),
  }).then(response => response.json());
}

function getUserURLs({ userId, token }) {
  return fetch(`${API_URL}/users/${userId}/urls`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(response => response.json());
}

function getTop10URLs() {
  return fetch(`${API_URL}/urls?sort=visitCount.desc&limit=10`)
    .then(response => response.json());
}

function register() {
  return fetch(`${API_URL}/users`, { method: 'POST' })
    .then(response => response.json());
}

const URLList = ({ urls }) => (
  urls.map(url => <div key={url.id}>{JSON.stringify(url)}</div>)
);
URLList.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object).isRequired,
};


class App extends Component {
  constructor() {
    super();

    this.state = {
      createdKey: '',
      urls: [],
      top10URLs: [],
    };
  }

  componentDidMount() {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      register().then(({ token }) => {
        localStorage.setItem('token', token);
        const { userId } = jwtDecode(token);
        this.setState({ userId, token });
      })
        .then(async () => {
          const { userId, token } = this.state;
          const [urls, top10URLs] = await Promise.all([
            getUserURLs({ userId, token }),
            getTop10URLs(),
          ]);
          this.setState({ urls, top10URLs });
        });
    } else {
      const { userId } = jwtDecode(savedToken);
      this.setState({ userId, token: savedToken });
      getUserURLs({ userId, token: savedToken })
        .then((urls) => {
          this.setState({ urls });
        })
        .then(async () => {
          const top10URLs = await getTop10URLs();
          this.setState({ top10URLs });
        });
    }
  }

  onShortenURL = async (url) => {
    const { userId, token } = this.state;
    if (!userId || !token) return;
    const { key } = await createShortenedURL({ url, userId, token });
    const [urls, top10URLs] = await Promise.all([
      getUserURLs({ userId, token }),
      getTop10URLs(),
    ]);
    this.setState({ createdKey: key, urls, top10URLs });
  };

  render() {
    const { createdKey, urls, top10URLs } = this.state;

    return (
      <div className="App">
        <h1>sURL - Shorten your URL</h1>
        <URLInput shortenURL={this.onShortenURL} createdKey={createdKey} />

        <h2>Your shortened URLs</h2>
        <URLList urls={urls} />

        <h2>Top 10 visited URLs</h2>
        <URLList urls={top10URLs} />

        {/* TODO: add notification about new shorted url here */}
      </div>
    );
  }
}

export default App;

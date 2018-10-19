import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import { API_URL } from '../configs';
import URLInput from './URL-input';
import URLList from './URL-list';

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

class App extends Component {
  constructor() {
    super();

    this.state = {
      createdKey: '',
      urls: [],
      top10URLs: [],
    };
  }

  async componentDidMount() {
    let token = localStorage.getItem('token');
    if (!token) {
      const { token: newToken } = await register();
      localStorage.setItem('token', token);
      token = newToken;
    }

    const { userId } = jwtDecode(token);
    const [urls, top10URLs] = await Promise.all([
      getUserURLs({ userId, token }),
      getTop10URLs(),
    ]);

    this.setState({
      userId, token, urls, top10URLs,
    });
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
      <div>
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

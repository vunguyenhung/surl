import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import Typoraphy from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import connectNewURLStream from '../ws';

import {
  register, getUserURLs, getTop10URLs, createShortenedURL,
} from '../http';
import URLInput from './URL-input';
import URLList from './URL-list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urls: [],
      top10URLs: [],
      snackBarOpen: false,
      snackBarText: '',
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

    connectNewURLStream()
      .subscribe((newShortenedURL) => {
        this.setState({ snackBarOpen: true, snackBarText: newShortenedURL });
      });
  }

  onShortenURL = async (url) => {
    const { userId, token } = this.state;
    if (!userId || !token) return;
    await createShortenedURL({ url, userId, token });
    const [urls, top10URLs] = await Promise.all([
      getUserURLs({ userId, token }),
      getTop10URLs(),
    ]);
    this.setState({ urls, top10URLs });
  };

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  };

  render() {
    const {
      urls, top10URLs, snackBarOpen, snackBarText,
    } = this.state;

    return (
      <div>
        <Typoraphy variant="h1" align="center" gutterBottom>sURL - Shorten your URL</Typoraphy>
        <URLInput shortenURL={this.onShortenURL} />
        <URLList urls={urls} />

        <Typoraphy variant="h2" align="center" gutterBottom>Top 10 shortened URLs</Typoraphy>
        {
          top10URLs && top10URLs.length > 0
            ? <URLList urls={top10URLs} />
            : <Typoraphy variant="h3" align="center" gutterBottom>...</Typoraphy>
        }

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackBarOpen}
          onClose={this.handleSnackBarClose}
          autoHideDuration={6000}
          message={(
            <div>
              <h3>New URL Shortened!</h3>
              <span>{snackBarText}</span>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;

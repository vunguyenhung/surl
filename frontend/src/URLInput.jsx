import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from './configs';

class URLInput extends PureComponent {
  static propTypes = {
    shortenURL: PropTypes.func.isRequired,
    createdKey: PropTypes.string,
  };

  static defaultProps = {
    createdKey: '',
  };

  handleInputChange = (event) => {
    const url = event.target.value;
    this.setState({ url });
  };

  handleShortenURL = () => {
    const { url } = this.state;
    const { shortenURL } = this.props;

    if (!url) return;
    shortenURL(url);
  };

  render() {
    const { createdKey } = this.props;

    return (
      <Fragment>
        <input placeholder="Paste a link" onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleShortenURL}>shorten</button>
        {createdKey && <div>{`${API_URL}/${createdKey}`}</div>}
      </Fragment>
    );
  }
}

export default URLInput;

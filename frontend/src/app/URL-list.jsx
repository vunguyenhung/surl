import PropTypes from 'prop-types';
import React from 'react';

const URLList = ({ urls }) => (
  urls.map(url => <div key={url.id}>{JSON.stringify(url)}</div>)
);
URLList.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default URLList;

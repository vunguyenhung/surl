import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  textField: {
    width: 500,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class URLInput extends PureComponent {
  static propTypes = {
    shortenURL: PropTypes.func.isRequired,
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

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleShortenURL();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          variant="outlined"
          placeholder="Paste a link"
          className={classes.textField}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <Button
          type="button"
          size="large"
          color="primary"
          variant="outlined"
          onClick={this.handleShortenURL}
        >
          shorten
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(URLInput);

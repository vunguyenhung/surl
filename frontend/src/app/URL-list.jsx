import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 5,
  },
  list: {
    width: '100%',
    maxWidth: 640,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    paddingRight: 10,
    paddingLeft: 10,
  },
});

function URLList({ urls, classes }) {
  return (
    <div className={classes.container}>
      <List className={classes.list} dense>
        {urls.map(url => (
          <ListItem key={url.id} button className={classes.listItem}>
            <ListItemText
              primary={url.url}
              secondary={url.shortenedURL}
            />
            <ListItemSecondaryAction>
              <CopyToClipboard text={url.shortenedURL}>
                <Button color="primary" variant="outlined" size="small">Copy shortened URL</Button>
              </CopyToClipboard>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default withStyles(styles)(URLList);

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { APP_NAME } from '../constants';


export default class AppHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <AppBar
          title={APP_NAME}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <RaisedButton
          label="Toggle Drawer"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}>
            <MenuItem>Create Blog</MenuItem>
            <MenuItem>List Blog</MenuItem>
            <MenuItem>Logout</MenuItem>
        </Drawer>
      </div>
    );
  }
}
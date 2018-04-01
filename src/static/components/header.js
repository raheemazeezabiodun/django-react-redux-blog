import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import { APP_NAME } from '../constants';


export default class AppHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <AppBar
          title={APP_NAME}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer 
            containerStyle={{marginTop: 65}}
            open={this.state.open}
            width={200}
            onRequestChange={(open) => this.setState({open})}
        >
            <MenuItem>Create Blog</MenuItem>
            <MenuItem>List Blog</MenuItem>
            <MenuItem>Logout</MenuItem>
        </Drawer>
      </div>
    );
  }
}
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { APP_NAME } from '../constants';


class AppHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  goToRoute = (route) => {
    this.props.dispatch(push(route));
  }

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
            <MenuItem onClick={this.goToRoute('/blog/create')}>Create Blog</MenuItem>
            <MenuItem>List Blog</MenuItem>
            <MenuItem>Logout</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default connect()(AppHeader);

import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import * as actionCreators from '../../actions/auth';


class LoginView extends React.Component {
    constructor(props) {
        super(props);
        const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/' : '/';
        this.state = {
            email: '',
            password: '',
            redirectTo: redirectRoute
        }
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'))
        }
    }

    extractRedirect = (string) => {
        const match = string.match(/next=(.*)/);
        return match ? match[1] : '/';
    };

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    login = (e) => {
        e.preventDefault();
        if (this.state.email && this.state.password) {
            this.props.actions.authLogin(this.state.email, this.state.password, this.state.redirectTo);
        }
    };

    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <Card>
                    <CardHeader
                        title="Login"
                    />
                    <CardText>
                        <p>Email: a@a.com, password: qw</p>
                        <TextField
                            id="email"
                            floatingLabelText="Email"
                            type="text"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            id="password"
                            floatingLabelText="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </CardText>
                    <CardActions>
                        <FlatButton label="Login" onClick={this.login} />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

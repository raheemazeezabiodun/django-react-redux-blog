import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import AppHeader from '../../components/header';
import { styles } from './styles';

class HomeView extends React.Component {

    goToLogin = () => {
        this.props.dispatch(push('/login'));
    }

    render() {
        return (
            <div>
                <AppHeader />
                <div className="col-sm-6 col-sm-offset-3" style={styles.cardStyle}>
                    <Card containerStyle={styles.cardStyle}>
                        <CardHeader
                            title="Django Blog"
                            subtitle="An illustration on how to use django, react and redux"
                        />
                        <CardText>
                            <p>This is a blog built with django, react and redux</p>
                            <p>Django serves the url while webpack bundles the js files.</p>
                        </CardText>
                        <CardActions>
                            <FlatButton label="Login" onClick={this.goToLogin} />
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }
}

export default connect()(HomeView);

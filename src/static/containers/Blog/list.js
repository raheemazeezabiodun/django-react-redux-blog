import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppHeader from '../../components/header';
import * as actionCreators from '../../actions/blog';

class FetchBlogView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: [],
            fetched: false
        }
    }

    componentDidMount() {
        this.props.actions.fetchBlog(this.props.auth.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.blog && nextProps.blog.data) {
            this.setState({
                blog: nextProps.blog.data,
                fetched: true
            })
        }
    }

    renderRowData = () => {
        this.state.blog.map((data, index) => (
            
                <Card>
                    <CardHeader
                        title={data.title}
                        avatar={data.image}
                    />
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardText>
                        {data.content}
                    </CardText>
                </Card>

            )
        );
    }

    renderEmptyRow = () => {
        return (
            <h4>No blog data.</h4>
        )
    }

    render() {
        const hasData = this.state.blog.length ? this.renderRowData() : this.renderEmptyRow();
        return (
            <div>
                <AppHeader />
                <div className="col-sm-6 col-sm-offset-2">
                    {hasData}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        blog: state.blog
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchBlogView);

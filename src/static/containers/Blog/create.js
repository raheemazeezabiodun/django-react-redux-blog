import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CKEditor from "react-ckeditor-component";


import AppHeader from '../../components/header';


class CreateBlogView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            slug: '',
            content: ''
        }
    }

    handleTitleChange = (e) => {
        this.setState({
            title: event.target.value,
            slug: event.target.value.replace(/\s+/g, '-').toLowerCase()
        })
    }

    onChange = (evt) => {
        this.setState({
          content: evt.editor.getData()
        });
    };

    submit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <AppHeader />
                <div className="col-sm-6 col-sm-offset-2">
                    <Card>
                        <CardHeader
                            title="Create a new blog post."
                        />
                        <CardText>
                            <TextField
                                id="title"
                                floatingLabelText="Title of the blog post"
                                type="text"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            /><br />
                            <CKEditor 
                                activeClass="p10" 
                                content={this.state.content} 
                                events={{
                                    "change": this.onChange
                                }}
                            />
                        </CardText>
                        <CardActions>
                            <RaisedButton label="Create" onClick={this.submit} />
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }
}

export default CreateBlogView;

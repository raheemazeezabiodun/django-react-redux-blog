import React from 'react';
import { Route, Switch } from 'react-router';
import { HomeView, NotFoundView, LoginView, CreateBlogView, FetchBlogView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/login/" component={LoginView} />
        <Route path="/blog/create/" component={requireAuthentication(CreateBlogView)} />
        <Route path="/blog/list/" component={requireAuthentication(FetchBlogView)} />
        <Route path="*" component={NotFoundView} />
    </Switch>
);

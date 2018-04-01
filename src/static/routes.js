import React from 'react';
import { Route, Switch } from 'react-router';
import { HomeView, NotFoundView, LoginView, CreateBlogView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/login" component={LoginView} />
        <Route exact path="/blog/create/" component={requireAuthentication(CreateBlogView)} />
        <Route path="*" component={NotFoundView} />
    </Switch>
);

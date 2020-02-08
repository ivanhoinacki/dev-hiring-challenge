import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Main from '~/pages/Main';

import Project from '~/pages/Project';
import List from '~/pages/List';
import Task from '~/pages/Task';

export default function Rountes() {
    return (
        <Switch>
            <Route exact path="/" component={SingIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/main" component={Main} isPrivate />

            <Route path="/project/new/:id" component={Project} isPrivate />
            <Route path="/list/new/:id" component={List} isPrivate />
            <Route path="/task/new/:id" component={Task} isPrivate />
        </Switch>
    );
}

import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';

import Main from '../pages/Main';

import NotFound from '../pages/NotFound';

export default function Routes() {
    return (
        <Switch>
            <Route path="/singIn" exact component={SingIn} />
            <Route path="/SingUp" exact component={SingUp} />

            <Route path="/main" exact component={Main} isPrivate />

            <Route component={NotFound} />
        </Switch>
    );
}

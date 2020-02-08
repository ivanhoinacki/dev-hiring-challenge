import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

import Dashboard from '@/pages/Main';

export default function Rountes() {
    return (
        <Switch>
            <Route exact path="/" component={SingIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/main" component={Dashboard} isPrivate />
        </Switch>
    );
}

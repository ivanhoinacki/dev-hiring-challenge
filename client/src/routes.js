import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SingIn from './pages/singIn';
import Main from './pages/main';
import NotFound from './pages/notFound';

export default function Routes({ appProps }) {
    return (
        <Switch>
            <Route
                path="/singIn"
                exact
                component={SingIn}
                appProps={appProps}
            />

            <Route path="/main" exact component={Main} appProps={appProps} />

            <Route component={NotFound} />
        </Switch>
    );
}

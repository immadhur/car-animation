import React from 'react'
import Main from '../components/layouts/Main';
import Blank from '../components/layouts/Blank';

import MainView from '../views/Main';
import MinorView from '../views/Minor';

import { Route, Switch } from 'react-router-dom';

export default (
    <Switch>
        <Route path="/" component={Main} ></Route>
        {/* <IndexRedirect to="/main" /> */}
        <Route path="main" component={MainView}> </Route>
        <Route path="minor" component={MinorView}> </Route>
    </Switch>
);
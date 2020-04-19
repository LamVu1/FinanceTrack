import React from 'react';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import { Switch, Redirect } from 'react-router-dom';

import LandingPage from '../pages/landing_page';
import MainPage from '../pages/main_page';

import NavBar from '../components/navbar/navbar';

const App = () => (
    <div>
    <NavBar />

    <Switch>
        <ProtectedRoute exact path="/main" component={MainPage} />
        <AuthRoute exact path="/" component={LandingPage} />
        <Redirect to='/' />
    </Switch>
    </div>
);

export default App;
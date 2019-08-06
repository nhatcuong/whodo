import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';
import RosterPage from 'components/RosterPage';
import HomePage from 'components/HomePage';

class App extends Component {

    render() {
        return (
            <Router>
                <Link to={ROUTES.HOME_PATH}>
                    <h1>Whodo</h1>
                </Link>
                <Route exact path={ROUTES.HOME_PATH} component={HomePage}/>
                <Route path={ROUTES.ROSTER_PATH} component={RosterPage}/>
            </Router>
        )
    }
}

export default App;
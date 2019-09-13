import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';
import RosterTaskPage from 'components/RosterTaskPage';
import HomePage from 'components/HomePage';
import RosterMemberPage from 'components/RosterMemberPage';

class App extends Component {

    render() {
        return (
            <Router>
                <Link to={ROUTES.HOME_PATH}>
                    <h1>Whodo</h1>
                </Link>
                <Route exact path={ROUTES.HOME_PATH} component={HomePage}/>
                <Route exact path={ROUTES.ROSTER_PATH} component={RosterTaskPage}/>
                <Route path={ROUTES.ROSTER_MEMBER_PATH} component={RosterMemberPage}/>
            </Router>
        )
    }
}

export default App;
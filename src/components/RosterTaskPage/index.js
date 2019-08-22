import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from 'redux/actions';
import TaskForm from 'components/TaskForm';
import TaskList from 'components/TaskList';
import MemberForm from 'components/MemberForm';
import MemberList from 'components/MemberList';

class RosterTaskPage extends Component {
    componentWillMount() {
        const { rosterId } = this.props.match.params;
        this.props.dispatch(
            actions.fetchCurrentRoster(rosterId)
        );
    }

    render() {
        const { rosterId } = this.props.match.params;
        return (
            <div>
                Roster {this.props.roster.title} Id: {rosterId}
                <TaskForm rosterId={rosterId}></TaskForm>
                <TaskList rosterId={rosterId}></TaskList>
                ======================
                <MemberForm rosterId={rosterId}></MemberForm>
                <MemberList rosterId={rosterId}></MemberList>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    roster: state.currentRoster
});

export default connect(mapStateToProps)(RosterTaskPage);
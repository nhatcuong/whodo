import React, {Component} from 'react';
import TaskForm from 'components/TaskForm';
import TaskList from 'components/TaskList';
import MemberForm from 'components/MemberForm';
import MemberList from 'components/MemberList';

export default class RosterPage extends Component {
    render() {
        const { rosterId } = this.props.match.params;
        return (
            <div>
                RosterId: {rosterId}
                <TaskForm rosterId={rosterId}></TaskForm>
                <TaskList rosterId={rosterId}></TaskList>
                ======================
                <MemberForm rosterId={rosterId}></MemberForm>
                <MemberList rosterId={rosterId}></MemberList>
            </div>
        )
    }
}
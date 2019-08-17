import React, { Component } from 'react';
import { connect } from 'react-redux'

// import { retrieveTasks } from 'domain/task';
import * as actions from 'redux/actions';
import * as Member from 'domain/member';
import TaskItem from 'components/TaskItem';

const INITIAL_STATE = {
    availableMembers: []
}

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchTask(this.props.rosterId));
        Member.retrieveForRoster(
            this.props.rosterId,
            results => {
                this.setState({availableMembers: results});
            }
        );
    }

    render() {
        const tasks = this.props.tasks.map(
            task => {
                return (
                    <TaskItem
                        key={task.id}
                        task={task}>
                    </TaskItem>
                );
            }
        );

        return (
            <div>
                <div>__Tasks</div>
                { tasks }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks
});

export default connect(mapStateToProps)(TaskList);
import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'redux/actions';

const AssigneeFilterRemove = (props) => {

    const assigneeSelected = props.members.filter(
        (m) => m.id === props.filterByAssigneeId
    )[0];

    const onClickFilterRemove = (event) => {
        props.dispatch(actions.removeFilterByAssigneeId());
    }

    return (
        <div>
            <div>__Selected Assignee: {assigneeSelected.name}</div>
            <button onClick={onClickFilterRemove}>
                X
            </button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    members: state.members,
    filterByAssigneeId: state.filterByAssigneeId
});

export default connect(mapStateToProps)(AssigneeFilterRemove);

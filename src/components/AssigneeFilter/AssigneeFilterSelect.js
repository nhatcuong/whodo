import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'redux/actions';

const AssigneeFilterSelect = (props) => {

    const onClickFilterChoice = (event) => {
        const memberId = event.target.getAttribute('data-member');
        props.dispatch(actions.filterByAssigneeId(memberId));
    };

    const renderLayoutChooseFilter = () => {
        return (
            <div>
                <div>__Filter by Assignee:</div>
                {renderFilterChoices()}
            </div>
        );
    };

    const renderFilterChoices = () => {
        return props.members.map((member) => (
            <button data-member={member.id} key={member.id} onClick={onClickFilterChoice}>
                {member.name}
            </button>
        ));
    };

    return renderLayoutChooseFilter();
}

const mapStateToProps = (state) => ({
    members: state.members,
    filterByAssigneeId: state.filterByAssigneeId
});

export default connect(mapStateToProps)(AssigneeFilterSelect);

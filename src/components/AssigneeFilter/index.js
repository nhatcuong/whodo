import React from 'react';
import {connect} from 'react-redux';

import AssigneeFilterRemove from './AssigneeFilterRemove';
import AssigneeFilterSelect from './AssigneeFilterSelect';

const AssigneeFilter = (props) => {
    if (props.filterByAssigneeId) {
        return (<AssigneeFilterRemove></AssigneeFilterRemove>);
    }
    else {
        return (<AssigneeFilterSelect></AssigneeFilterSelect>);
    }
}

const mapStateToProps = (state) => ({
    filterByAssigneeId: state.filterByAssigneeId
});

export default connect(mapStateToProps)(AssigneeFilter);

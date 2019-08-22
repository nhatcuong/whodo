import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'redux/actions';

const INITIAL_STATE = {
    members: []
}

class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    render() {
        const members = this.props.members.map(
            member => {
                return (
                    <div key={ member.id }>{ member.name }</div>
                );
            }
        );

        return (
            <div>
                <div>__Member</div>
                { members }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    members: state.members
});

export default connect(mapStateToProps)(MemberList);

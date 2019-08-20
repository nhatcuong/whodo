import * as db from '../db';

export function create(name, rosterId, successCb, errorCb=null) {
    db.insertMemberInDb(name, rosterId)
        .then(successCb)
        .catch(errorCb);
}

export function retrieveForRoster(rosterId, successCb, errorCb=null) {
    db.retrieveMembersForRosterFromDb(rosterId)
        .then(successCb)
        .catch(errorCb);
}

// retrieve all relevant task

// add new task

// remove task
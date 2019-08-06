import * as db from '../db';

export function create(name, rosterId, successCb, errorCb=null) {
    db.insertMemberInDb(name, rosterId, successCb, errorCb);
}

export function retrieveForRoster(rosterId, successCb, errorCb=null) {
    db.retrieveMembersForRosterFromDb(rosterId, successCb, errorCb);
}

// retrieve all relevant task

// add new task

// remove task
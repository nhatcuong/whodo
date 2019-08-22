import { 
    insertRosterInDb,
    retrieveRostersFromDb,
    getRosterFromDb
} from 'db';

export function create(title, successCb=null, errorCb=null) {
    insertRosterInDb(title)
        .then(successCb)
        .catch(errorCb);
}

export function retrieveRosters(successCb, errorCb=null) {
    retrieveRostersFromDb()
        .then(successCb)
        .catch(errorCb);
}

export function getRoster(rosterId, successCb, errorCb=null) {
    getRosterFromDb(rosterId)
        .then(successCb)
        .catch(errorCb);
}

// retrieve all relevant task

// add new task

// remove task
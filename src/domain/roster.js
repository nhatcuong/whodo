import { insertRosterInDb } from '../db';
import { retrieveRostersFromDb } from "db";

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

// retrieve all relevant task

// add new task

// remove task
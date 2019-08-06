import { insertRosterInDb } from '../db';
import { retrieveRostersFromDb } from "db";

export function create(title, successCb=null, errorCb=null) {
    insertRosterInDb(title, successCb, errorCb);
}

export function retrieveRosters(successCb, errorCb=null) {
    retrieveRostersFromDb(successCb, errorCb);
}

// retrieve all relevant task

// add new task

// remove task
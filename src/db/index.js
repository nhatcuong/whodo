import Firebase, { FieldValue } from './firebase';

export function insertRosterInDb(title, successCb=null, errorCb=null) {
    const firebase = new Firebase();
    firebase.db.collection("rosters").add({
        title: title,
    })
    .then(function(docRef){
        if (successCb) successCb(docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        if (errorCb) errorCb(error);
    });
}

export function retrieveRostersFromDb(successCb, errorCb=null) {
    const firebase = new Firebase();
    firebase.db.collection("rosters")
        .get()
        .then(querySnapshot => {
            var results = [];
            querySnapshot.forEach(docRef => {
                results.push({id: docRef.id, ...docRef.data()});
            });
            successCb(results);
        })
        .catch(error => {
            if (errorCb) {
                errorCb(error);
            }
        });
}

export function insertTaskInDb(title, rosterId, successCb, errorCb=null) {
    const firebase = new Firebase();
    firebase.db.collection("tasks").add({
        title: title,
        rosterId: rosterId
    })
    .then(function(docRef) {
        if (successCb) {
            successCb({id: docRef.id, ...docRef.data()});
        }
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        if (errorCb) {
            errorCb(error);
        }
    });
}

export function retrieveTasksFromDb(rosterId, successCb=null, errorCb=null) {
    const firebase = new Firebase();
    const query = firebase.db.collection("tasks").where('rosterId', '==', rosterId);
    query.get()
        .then(querySnapshot => {
            var results = [];
            querySnapshot.forEach(docRef => {
                results.push({id: docRef.id, ...docRef.data()});
            });
            successCb(results);
        })
        .catch(error => {
            if (errorCb) {
                errorCb(error);
            }
        });
}

export function insertMemberInDb(name, rosterId, successCb, errorCb=null) {
    const firebase = new Firebase();
    firebase.db.collection("members").add({
        name: name,
        rosterId: rosterId
    })
    .then(function(docRef) {
        if (successCb) {
            successCb({id: docRef.id, ...docRef.data()});
        }
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export function retrieveMembersForRosterFromDb(rosterId, successCb=null, errorCb=null) {
    const firebase = new Firebase();
    const query = firebase.db.collection("members").where('rosterId', '==', rosterId);
    query.get()
        .then(querySnapshot => {
            var results = [];
            querySnapshot.forEach(docRef => {
                results.push({id: docRef.id, ...docRef.data()});
            });
            successCb(results);
        })
        .catch(error => {
            if (errorCb) {
                errorCb(error);
            }
        });
}

export function assignMemberToTaskInDb(task, member, successCb=null, errorCb=null) {
    const firebase = new Firebase();
    firebase.db.collection('tasks').doc(task.id).update({
        assignees: FieldValue.arrayUnion(member)
    })
        .then(function() {
            if (successCb) {
                successCb();
            }
        })
        .catch(function(error) {
            if (errorCb) {
                errorCb(error);
            }
        });

}
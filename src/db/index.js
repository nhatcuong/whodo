import Firebase, { FieldValue } from './firebase';

export async function insertRosterInDb(title) {
    const firebase = new Firebase();
    const docRef = await firebase.db.collection("rosters").add({
        title: title,
    });
    return docRef.id;
}

export async function retrieveRostersFromDb() {
    const firebase = new Firebase();
    const querySnapshot = await firebase.db.collection("rosters").get();
    var results = [];
    querySnapshot.forEach(docRef => {
        results.push({id: docRef.id, ...docRef.data()});
    });
    return results;
}

export async function getRosterFromDb(rosterId) {
    const firebase = new Firebase();
    const doc = await firebase.db.collection("rosters").doc(rosterId).get();
    return {
        id: doc.id,
        ...doc.data()
    }
}

export async function insertTaskInDb(title, rosterId) {
    const firebase = new Firebase();
    const docRef = await firebase.db.collection("tasks").add({
        title: title,
        rosterId: rosterId
    });
    return {
        id: docRef.id,
        title,
        rosterId,
        assignees: []
    };
}

export async function retrieveAliveTasksFromDb(rosterId) {
    const firebase = new Firebase();
    const query = firebase.db.collection("tasks")
        .where('rosterId', '==', rosterId);
    const querySnapshot = await query.get();
    var results = [];
    querySnapshot.forEach(docRef => {
        const data = docRef.data();
        results.push({
            id: docRef.id, 
            ...data,
            assignees: data.assignees ? data.assignees : []
        });
    });
    return results;
}

export async function insertMemberInDb(name, rosterId) {
    const firebase = new Firebase();
    const docRef = await firebase.db.collection("members").add({
        name: name,
        rosterId: rosterId
    });
    return {
        id: docRef.id,
        name,
        rosterId
    };
}

export async function retrieveMembersForRosterFromDb(rosterId) {
    const firebase = new Firebase();
    const query = firebase.db.collection("members").where('rosterId', '==', rosterId);
    const querySnapshot = await query.get();
    var results = [];
    querySnapshot.forEach(docRef => {
        results.push({
           id: docRef.id,
           ...docRef.data() 
        });
    });
    return results;
}

export async function assignMemberToTaskInDb(task, member) {
    const firebase = new Firebase();
    return await firebase.db.collection('tasks').doc(task.id).update({
        assignees: FieldValue.arrayUnion(member)
    })
}
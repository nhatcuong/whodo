import app from 'firebase';
import 'firebase/firestore';
import { FIREBASE_CONFIG } from 'conf';

const config = {
    apiKey: FIREBASE_CONFIG.apiKey,
    authDomain: FIREBASE_CONFIG.authDomain,
    databaseURL: FIREBASE_CONFIG.databaseURL,
    projectId: FIREBASE_CONFIG.projectId,
    storageBucket: FIREBASE_CONFIG.storageBucket,
    messagingSenderId: FIREBASE_CONFIG.messagingSenderId,
    appId: FIREBASE_CONFIG.appId
};

class Firebase {
    static instance;

    constructor() {
        if (!!Firebase.instance) {
            return Firebase.instance;
        }
        app.initializeApp(config);
        this.db = app.firestore();
        Firebase.instance = this;
        return this;
    }
}

export const FieldValue = app.firestore.FieldValue;

export default Firebase;
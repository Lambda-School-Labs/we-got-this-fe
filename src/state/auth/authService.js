import Firebase from '../../config/firebase';

const db = Firebase.getFirestore();

export const service = {
    //
    //GET OR CREATE CURRENT USER
    async getOrCreateCurrentUser(authUser) {
        let { email, displayName, photoURL} = authUser;

        let currentUser;
        let querySnapshot = await db
            .collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!querySnapshot.empty) {
            console.log('Got Current User');
            querySnapshot.forEach(doc => {
                let docRef = doc.id;
                currentUser = { docRef, ...doc.data() };
            });
        } else {
            console.log('No User found, creating a new one!');
            //Create a new user
            let docRef = await db.collection('users').add({
                email,
                displayName,
                photoURL,
            });

            docRef.get().then(doc => {
                let docRef = doc.id;
                currentUser = { docRef, ...doc.data() };
            });
        }
        return currentUser;
    },

    //Edit Admin
    async editAdmin(updateAdmin) {
        let docRef = await db
        .collection("accounts")
        .doc(`${updateAdmin.docRef}`)
        .put({
            ...updateAdmin,
        });

        let updatedAdmin = null;
        docRef.get().then(doc => {
            let docRef = doc.id;
            updatedAdmin = {docRef, ...doc.data() };
        });
        return updatedAdmin;
    },

    //CREATE COMPANY
    async createCompany(values) {
        let docRef = await db.collection('accounts').add({
           ...values
        });
        let company = {}
        let doc = await docRef.get()
        let docId = doc.id;
        company = {docId, ...doc.data()}
        return company;
    },

    //GET COMPANY
    async getCompany(accountId) {
        let currentCompany;
        let querySnapshot = await db.collection("accounts").where("company", "==", accountId).get()
        querySnapshot.forEach(function(doc) {
            let docId = doc.id;
            currentCompany = { docId, ...doc.data() };
        })
        return currentCompany;

    }
};

import Firebase from '../../config/firebase';
const db = Firebase.getFirestore();

export const service = {
    async addCustomer(values) {
        let docRef = await db.collection('customers').add({
            ...values,
        });

        let customers = {};
        let doc = await docRef.get();
        let docId = doc.id;
        customers = { docId, ...doc.data() };

        return customers;
    },
};

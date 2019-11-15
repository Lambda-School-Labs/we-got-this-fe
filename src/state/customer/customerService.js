import Firebase from '../../config/firebase';
const db = Firebase.getFirestore();

export const service = {
    async addCustomer(customer) {
        let docRef = db.collection('customers').add({
            ...customer,
        });

        let data = await docRef.get();

        return data;
    },
};

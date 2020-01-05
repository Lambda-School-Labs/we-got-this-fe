import Firebase from '../../config/firebase';
// import { installActionNames } from '..';
const db = Firebase.getFirestore();
const storageRef = Firebase.getStorageRef();

export const service = {
    async addCustomer(values) {
        let docRef = await db.collection('customers').add({
            ...values,
        });

        let customer = {};
        let doc = await docRef.get();
        let docId = doc.id;
        customer = { docId, ...doc.data() };

        return customer;
    },

    async getCustomers() {
        let customers = [];
        let querySnapshot = await db.collection('customers').get();

        querySnapshot.forEach(doc => {
            let docId = doc.id;
            let customerData = doc.data();
            let customer = { docId, ...customerData };
            customers.push(customer);
        });

        return customers;
    },

    async getCustomerJobs(jobPaths) {
        let promises = [];

        //Create a promise for each job Path
        jobPaths.forEach(path => {
            path = path.slice(path.indexOf('/') + 1);
            promises.push(
                db
                    .collection('jobs')
                    .doc(path)
                    .get()
            );
        });

        //Resolve all the promises
        let docSnaps = await Promise.all(promises);

        //map each resolved promise to the jobs table
        let jobs = docSnaps.map(docSnap => {
            let docId = docSnap.id;
            return { docId, ...docSnap.data() };
        });

        return jobs;
    },
    async updateCustomer(docId, values) {
        await db
            .collection('customers')
            .doc(docId)
            .update({ ...values });

        let updatedCustomer = await db
            .collection('customers')
            .doc(docId)
            .get();

        return { docId, ...updatedCustomer.data() };
    },

    async getCurrentCustomer(customerId) {
        console.log('Service: ', customerId);
        let customer = await db
            .collection('customers')
            .doc(customerId)
            .get();

        try {
            //If an image exists pass it on with the customer Data
            let customer_img_url = await storageRef
                .child(`customer_imgs/${customerId}`)
                .getDownloadURL();

            customer = {
                docId: customer.id,
                img: customer_img_url,
                ...customer.data(),
            };

            return customer;
        } catch (err) {
            //if no image exists, then just passs the data
            customer = { docId: customer.id, ...customer.data() };

            return customer;
        }
    },

    async getCustomerImage(customerId) {
        let customer_img_url = await storageRef
            .child(`customer_imgs/${customerId}`)
            .getDownloadURL();

        return customer_img_url;
    },
};

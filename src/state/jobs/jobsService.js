import Firebase from '../../config/firebase';
import moment from 'moment';

const db = Firebase.getFirestore();

export const service = {
    async getAllJobs() {
        return (await db.collection('jobs').get()).docs.map(doc => doc.data());
    },

    async scheduleNewJob(values) {
        let docRef = await db.collection('jobs').add({ ...values });
        let docId = (await docRef.get()).id;

        console.log('NewJob DocRef: ', docId);
        return docId;
    },

    async addJobToCustomer(customerDocId, jobDocId) {
        let customer = (
            await db
                .collection('customers')
                .doc(`${customerDocId}`)
                .get()
        ).data();

        console.log('AddJobToCustomer: ', customer);

        let updatedJobs = await db
            .collection('customers')
            .doc(`${customerDocId}`)
            .update({ jobs: [...customer.jobs, `${jobDocId}`] });

        console.log('UpdatedJobs: ', updatedJobs);
    },
    async uploadJobImage(values) {
        try {
            let updatedImgs = await db
                .collection('jobs')
                .doc(`${values.jobId}`)
                .update({
                    photos: [
                        ...values.photos,
                        {
                            url: values.url,
                            tag: values.tag,
                            note: values.note,
                        },
                    ],
                });

            console.log('Updated Images', updatedImgs);
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};

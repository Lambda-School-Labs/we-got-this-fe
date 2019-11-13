import Firebase from '../../config/firebase';
const db = Firebase.getFirestore();

export const jobService = {
    async addJob(job) {
        let docRef = db.collection('jobs').add({
            ...job,
        });

        let data = await docRef.get();

        return data;
    },
};

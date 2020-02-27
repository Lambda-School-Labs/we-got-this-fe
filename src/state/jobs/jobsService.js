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

        
        return docId;
    },

    async addJobToCustomer(customerDocId, jobDocId) {
        let customer = (await db
            .collection('customers')
            .doc(`${customerDocId}`)
            .get()).data();

        

        let updatedJobs = await db
            .collection('customers')
            .doc(`${customerDocId}`)
            .update({ jobs: [...customer.jobs, `${jobDocId}`] });

        
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

            
        } catch (err) {
            
            return err;
        }
    },
    async updateJobImage(values) {
        let { jobId, photos, url, tag, note } = values;
        try {
            //update photos
            let photoIndex = photos.findIndex(
                photo =>
                    photo.url == url || photo.tag == tag || photo.note == note
            );

            photos[photoIndex] = { url, tag, note };

            await db
                .collection('jobs')
                .doc(`${values.jobId}`)
                .update({
                    photos: [...photos],
                });
            return true;
        } catch (err) {
            
            return err;
        }
    },
    async deleteJobImage(values) {
        try {
            let { jobId, photos, photoIndex } = values;
            photos = photos.slice();
            photos.splice(photoIndex, 1);

            await db
                .collection('jobs')
                .doc(`${jobId}`)
                .update({photos});
            
            return photos;
        } catch (err) {
            
            return err;
        }
    },
    async saveChecklistToJob(jobId, downloadURL) {
        await db
            .collection('jobs')
            .doc(`${jobId}`)
            .update({ approved_checklist_url: downloadURL });
    },
};

import Firebase from '../../firebase';

const db = Firebase.getFirestore();


export const inviteTech = (/* dispatch, */ tech) => {

    let {firstName, lastName, email, phone, address , notes , city , zip,} = tech;

    db.collection('techs').add({
        firstName,
        lastName,
        email,
        phone,
        address,
        notes,
        city,
        zip,
    });

    // dispatch({
    //     type: INVITE_TECH,
    //     payload: user,
    // });

}

// export default function reducer(state, action) {
//     let payload = action.payload

//     switch (action.type) {
//         case INVITE_TECH: 
//         return {
//             ...state,
//             ...payload
//         }
//     }
// }
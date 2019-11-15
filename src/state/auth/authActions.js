import Firebase from '../../config/firebase';
import { auth } from 'firebase';
import { service } from './authService';

let gapi = window.gapi;

export const types = {
    AUTH_START: 'AUTH_START',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',

    AUTH_LOGOUT: 'AUTH_LOGOUT',

    CREATE_COMPANY: "CREATE_COMPANY",
    COMPANY_LIST: "COMPANY_LIST",
    EDIT_ADMIN: "EDIT_ADMIN"
};

export const actions = {
    async login(dispatch) {
        try {
            dispatch({ type: types.AUTH_START });
            const googleAuth = gapi.auth2.getAuthInstance();
            const googleUser = await googleAuth.signIn();

            const token = googleUser.getAuthResponse().id_token;
            const credential = auth.GoogleAuthProvider.credential(token);

            await Firebase.signInWithCredential(credential);
        } catch (error) {
            dispatch({ type: types.AUTH_ERROR });
        }
    },

    async getOrCreateCurrentUser(dispatch, user) {
        try {
            dispatch({ type: types.AUTH_START });

            let data = await service.getOrCreateCurrentUser(user);
            console.log(data);

            dispatch({
                type: types.AUTH_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({ type: types.AUTH_ERROR });
        }
    },

    logout(dispatch) {
        Firebase.signOut();
        const googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signOut();
        dispatch({ type: types.AUTH_LOGOUT });
    },

    async editAdmin(dispatch, values){
        try {
            dispatch({ type: types.AUTH_UPDATE_ADMIN_START });

            let updatedAdmin = await service.editAdmin(values);
            if (!updatedAdmin) {
                throw new Error('Failed to update Admin');
            }
            dispatch({
                type: types.AUTH_UPDATE_ADMIN_SUCCESS,
                payload: updatedAdmin,
            });
        } catch (err) {
            dispatch({ type: types.AUTH_UPDATE_USER_ERROR });
        }
    },

    async createCompany(dispatch, values) {
        try{
            let newCompany = await service.createCompany(values);
            if (!newCompany) {
                throw new Error("Failed to create Company");
            }
            dispatch({
                type: types.CREATE_COMPANY,
                payload: newCompany,
            });
            return true
        } catch (err) {
            return Error;
        }
    },

    async getCompany(dispatch, values){
        try{
            
            let companyInfo = await service.getCompany(values);
            console.log("company info", companyInfo);

            dispatch({type: types.COMPANY_LIST,
            payload: companyInfo});
        }catch (error) {
                dispatch({type: types.AUTH_ERROR});
            }
    }
};

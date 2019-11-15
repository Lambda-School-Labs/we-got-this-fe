let gapi = window.gapi;

let googleConfig = {
    development: {
        apiKey: 'AIzaSyCSuD-_FQ3ockPsbQRsbCRgg1-lmcNsA6I',
        clientId:
            '566987245774-abeg79tlatngaaupsmdthc8ikouva2qo.apps.googleusercontent.com',
        discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/calendar',
    },
    production: {
        apiKey: 'AIzaSyDJSqxQaC6J2slKw9OG_St1KLOX0IGNK-Y',
        clientId:
            '950025882084-9nqo30qpe8p43obe781eo2cp3ou9bhil.apps.googleusercontent.com',
        discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/calendar',
    },
}[process.env.NODE_ENV || 'development'];

export async function initGoogleClient() {
    await gapi.load('client', () => {
        console.log('loaded client');
        gapi.client.init(googleConfig);
        gapi.client.load('calendar', 'v3', () =>
            console.log('loaded calendar')
        );
    });
}

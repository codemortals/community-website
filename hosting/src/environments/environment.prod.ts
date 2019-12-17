export const environment = {
    production: true,
    firebase: {
        apiKey: '{{ API_KEY }}',
        authDomain: '{{ AUTH_DOMAIN }}',
        databaseURL: '{{ DATABASE_URL }}',
        projectId: '{{ PROJECT_ID }}',
        storageBucket: '{{ STORAGE_BUCKET }}',
        messagingSenderId: '{{ MESSAGE_SENDER_ID }',
        appId: '{{ APP_ID }}',
    },
    google: {
        maps: '{{ GOOGLE_MAPS_KEY }}',
        analytics: '{{ GOOGLE_ANALYTICS_CODE }}'
    }
};

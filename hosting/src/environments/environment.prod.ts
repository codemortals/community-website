export const environment = {
    production: true,
    firebase: {
        apiKey: '{{ FIREBASE_API_KEY }}',
        authDomain: '{{ AUTH_DOMAIN }}',
        databaseURL: '{{ DATABASE_URL }}',
        projectId: '{{ PROJECT_ID }}',
        storageBucket: '{{ STORAGE_BUCKET }}',
        messagingSenderId: '{{ MESSAGE_SENDER_ID }',
        appId: '{{ APP_ID }}',
    },
    tracking: '{{ GOOGLE_ANALYTICS_CODE }}'
};

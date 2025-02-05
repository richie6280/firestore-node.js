import * as dotenv from 'dotenv';

dotenv.config();

const credentials = JSON.parse(process.env.FIREBASE_CREDENTIALS || '{}');

if (!credentials.private_key) {
  throw new Error('Firebase credentials not found! Check your .env file.');
}

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

export const firestore = db;

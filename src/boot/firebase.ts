import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAVaPj0ps_Iyjd7lw-7NWwQtoViV-TiUUg',
  authDomain: 'fir-db-testing-fd850.firebaseapp.com',
  projectId: 'fir-db-testing-fd850',
  storageBucket: 'fir-db-testing-fd850.appspot.com',
  messagingSenderId: '243460183462',
  appId: '1:243460183462:web:3db17f5bdc861697936b67',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { db, storage };

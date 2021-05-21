import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCyDlxsP-tO9Kl8hrjbjxkibDTMEH5BN_8',
  authDomain: 'project-77-56711.firebaseapp.com',
  projectId: 'project-77-56711',
  storageBucket: 'project-77-56711.appspot.com',
  messagingSenderId: '849086638732',
  appId: '1:849086638732:web:12c3208ee4a2a32a2869a9',
};

firebase.initializeApp(firebaseConfig)

export default firebase.firestore()
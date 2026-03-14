// ============================================
// FIREBASE CONFIGURATION
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyD7pSNqXFze26ToYtq6Lcz7l7LYiau1KUw",
  authDomain: "elemental-wars-3b131.firebaseapp.com",
  projectId: "elemental-wars-3b131",
  storageBucket: "elemental-wars-3b131.firebasestorage.app",
  messagingSenderId: "565189969958",
  appId: "1:565189969958:web:8a9ea8da6c8c035e307ee7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

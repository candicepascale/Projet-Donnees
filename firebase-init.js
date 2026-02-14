// ===== Firebase init (Cordova compat) =====
const firebaseConfig = {
  apiKey: "AIzaSyDnbGJmdev3ryWYgrgsGH-RNs58pYLUnNY",
  authDomain: "bijou-80bbd.firebaseapp.com",
  projectId: "bijou-80bbd",
  storageBucket: "bijou-80bbd.firebasestorage.app",
  messagingSenderId: "1030105531086",
  appId: "1:1030105531086:web:f7b0fcc9cd5e677f81069f"
};

firebase.initializeApp(firebaseConfig);

// Firestore instance accessible partout
window.db = firebase.firestore();

console.log("✅ Firebase chargé. Firestore prêt =", !!window.db);

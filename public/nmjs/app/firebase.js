 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyC_W88QbGvBc8yiNcuystqDEXgEXbg_wXE",
     authDomain: "trident-f72d0.firebaseapp.com",
     databaseURL: "https://trident-f72d0.firebaseio.com",
     projectId: "trident-f72d0",
     storageBucket: "",
     messagingSenderId: "269299895518"
 };
 firebase.initializeApp(config);

 // Get a reference to the database service
 var database = firebase.database();
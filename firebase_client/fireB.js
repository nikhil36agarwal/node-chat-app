var firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyACz1aopUFkd1T1rgPItGzV3JmQxCiTZ9o",
    authDomain: "magnetic-rite-295010.firebaseapp.com",
    databaseURL: "https://magnetic-rite-295010-default-rtdb.firebaseio.com",
    projectId: "magnetic-rite-295010",
    storageBucket: "magnetic-rite-295010.appspot.com",
    messagingSenderId: "110347819295",
    appId: "1:110347819295:web:9b53f81c3bb8e3b6b7382a",
    measurementId: "G-GWB3LTW6ZX"
};

const app = firebase.initializeApp(firebaseConfig)
module.exports = app
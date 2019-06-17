var serverFirebase = require("firebase-admin");

var serviceAccount = require("./secrets/me-tira-do-tedio-firebase-adminsdk-6gxw6-e7d295aab8.json");

serverFirebase.initializeApp({
  credential: serverFirebase.credential.cert(serviceAccount),
  databaseURL: "https://me-tira-do-tedio.firebaseio.com"
});

module.exports = serverFirebase;
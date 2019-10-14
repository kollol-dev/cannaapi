// firebase
var admin = require('firebase-admin');
var serviceAccount = require("../app/Controllers/Http/FirebaseAdminSDK_PvtKey/cannaapp-87a30-firebase-adminsdk-2zpyz-cbc3a9713e.json");
var FbAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cannaapp-87a30.firebaseio.com",
});


module.exports.admin = FbAdmin
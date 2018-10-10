const Firestore = require("@google-cloud/firestore");

const firestore = new Firestore({
  projectId: "react-firebase-arduino-ticker",
  keyFilename:
    "../global_secrets/react-firebase-arduino-ticker-0548f2b1de60.json"
});

const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

module.exports = firestore;

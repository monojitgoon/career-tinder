const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("Notification added", doc));
};

exports.userJoined = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const uid = context.params.userId;
    const users = snap.data();
    const notification = {
      userId: uid,
      content:
        "Your profile is " +
        `${users.profileCompletenessPercentage}` +
        " percent completed.Please update your profile to get your maximum of career tinder",
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });
exports.userUpdated = functions.firestore
  .document("users/{userId}")
  .onUpdate((change, context) => {
    const uid = context.params.userId;
    const users = change.after.data();
    const percentage = users.profileCompletenessPercentage;
    const text =
      percentage < 100
        ? `${percentage}` +
          " percent completed right now.Please update your profile to get your maximum from Career Tinder."
        : " completed right now. Thanks for being with Career Tinder";

    const notification = {
      userId: uid,
      content: "Your profile is " + text,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });
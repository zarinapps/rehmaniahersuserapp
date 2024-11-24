importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCwsgYo1L6w-PSXl-ybA1ixVauuy6L4VUc",
    authDomain: "rehmaniaherbssgd.firebaseapp.com",
    projectId: "rehmaniaherbssgd",
    storageBucket: "rehmaniaherbssgd.firebasestorage.app",
    messagingSenderId: "582661749671",
    appId: "1:582661749671:web:1dc6a6cbfd3bf4f96d1482",
    measurementId: "G-JD9Y0QF5TT",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});
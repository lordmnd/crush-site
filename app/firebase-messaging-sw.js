// Notifications de Crush sur le web (iPhone ajouté à l'écran d'accueil, PC).
// Identifiants publics Firebase (pas de secret).
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

const APP_ID_WEB = "1:940144992336:web:0f5515b7221fff20b0f155";

if (APP_ID_WEB) {
  firebase.initializeApp({
    apiKey: "AIzaSyCG0TXBjLAlThXu85neZTTiXb6lgrA73zs",
    authDomain: "crush-5f4bc.firebaseapp.com",
    projectId: "crush-5f4bc",
    storageBucket: "crush-5f4bc.firebasestorage.app",
    messagingSenderId: "940144992336",
    appId: APP_ID_WEB,
  });
  firebase.messaging();
}

// Toucher la notification ouvre Crush.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((liste) => {
      for (const c of liste) {
        if ("focus" in c) return c.focus();
      }
      return clients.openWindow(self.registration.scope);
    })
  );
});

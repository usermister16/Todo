
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { environment } from '../../environments';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'fake',
        authDomain: 'localhost',
        projectId: 'todolist-ghizlane',
        storageBucket: "gs://todolist-with-em.firebasestorage.app/",
      })
    ),

    provideAuth(() => {
      const auth = getAuth();
      environment.useEmulators?connectAuthEmulator(auth, 'http://localhost:8081'):undefined;
      return auth;
    }),

    provideFirestore(() => {
      const firestore = getFirestore();
      environment.useEmulators?connectFirestoreEmulator(firestore, 'localhost', 8082):undefined;
      return firestore;
    }),                 //Pour connecter l'application à l'émulateur Firestore si l'environnement est configuré pour l'utiliser
    provideStorage(() => {
      const storage = getStorage();
      environment.useEmulators?connectStorageEmulator(storage, 'localhost', 8084):undefined;
      return storage;
    })
  ]
};

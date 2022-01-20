export const environment = {
  firebase: {
    projectId: '',
    appId: '',
    storageBucket: '',
    locationId: '',
    apiKey: '',
    authDomain: '',
    messagingSenderId: '',
    measurementId: '',
  },

  dbConfig: {
    name: '',
    version: 1,
    objectStoresMeta: [
      {
        store: '',
        storeConfig: { keyPath: '', autoIncrement: true },
        storeSchema: [],
      },
      {
        store: '',
        storeConfig: {
          keyPath: '',
          autoIncrement: false,
          unique: true,
        },
        storeSchema: [],
      },
    ],
  },
  production: false,
};

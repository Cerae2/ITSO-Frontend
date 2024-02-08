import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import personalInfoReducer from "./slices/personalInfoSlices";

const personalInfoPersistConfig = {
  key: "personalInfo",
  storage,
};

const persistedPersonalInfoReducer = persistReducer(
  personalInfoPersistConfig,
  personalInfoReducer
);


const store = configureStore({
  reducer: {
    
    personalInfo: persistedPersonalInfoReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);


export { store, persistor };

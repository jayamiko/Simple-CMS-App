import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./slices/authSlice";
import { menuReducer } from "./slices/menuSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["menu", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import baseApis from "./baseApis";
import propertyReducer from "./slices/propertySlice";

const store = configureStore({
  reducer: {
    [baseApis.reducerPath]: baseApis.reducer,
    property: propertyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApis.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
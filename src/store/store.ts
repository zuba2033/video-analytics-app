import { configureStore } from "@reduxjs/toolkit";
import analyticsData from "../slices/slice";
import createSagaMiddleware from "redux-saga";
import saga from "../sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {analyticsData},
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
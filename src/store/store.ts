import { configureStore } from "@reduxjs/toolkit";
import analyticsData from "../slices/analyticsDataSlice";
import createSagaMiddleware from "redux-saga";
import analyticsDataSaga from "../sagas/analyticsDataSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {analyticsData},
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(analyticsDataSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
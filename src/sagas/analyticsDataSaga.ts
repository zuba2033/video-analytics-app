import { takeLatest, call, put } from "redux-saga/effects";
import { setAnalyticsDataRecieved, setAnalyticsDataLoading, setAnalyticsDataError } from "../slices/analyticsDataSlice";
import { iAnalyticsData } from "../types";

function* fetchAnalyticsData(): Generator<any, void, iAnalyticsData[]> {
    try {
        yield put(setAnalyticsDataLoading())
        const response = yield call(fetch, "http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd");
        const jsonResponse = yield (response as any).json();
        const data: iAnalyticsData[] = jsonResponse;
        yield put(setAnalyticsDataRecieved(data));
    } catch (error) {
        console.log("An error occurred while fetching analytics data:", error);
        yield put(setAnalyticsDataError());
    }
}

function* analyticsDataSaga() {
    yield takeLatest("analytics/loadAnalyticsData", fetchAnalyticsData);
}

export default analyticsDataSaga;



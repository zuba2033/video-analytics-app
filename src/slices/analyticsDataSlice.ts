import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { iAnalyticsData } from '../types';

type LoadingStatus = 'idle' | 'loading' | 'error';

interface iAnalyticsDataState {
    analyticsData: iAnalyticsData[],
    loadingStatus: LoadingStatus,
    error: boolean
}

const initialState : iAnalyticsDataState = {
    analyticsData: [],
    loadingStatus: 'idle',
    error: false
};

const analyticsDataSlice = createSlice({
    name: 'analyticsData',
    initialState,
    reducers: {
        setAnalyticsDataRecieved(state, action: PayloadAction<iAnalyticsData[]>) {
            state.analyticsData = action.payload;
            state.loadingStatus = 'idle'
        },
        setAnalyticsDataLoading(state) {
            state.loadingStatus = 'loading'
        },
        setAnalyticsDataError(state) {
            state.loadingStatus = 'error'
        }
  },
});

export const loadAnalyticsData = createAction('analytics/loadAnalyticsData');

export const { setAnalyticsDataRecieved, setAnalyticsDataLoading, setAnalyticsDataError } = analyticsDataSlice.actions;

const { reducer } = analyticsDataSlice;

export default reducer;
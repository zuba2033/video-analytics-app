import { createSlice, createAction, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { iAnalyticsData } from '../types';
import { RootState } from '../store/store';

type LoadingStatus = 'idle' | 'loading' | 'error';

interface iAnalyticsDataState {
    analyticsData: iAnalyticsData[],
    loadingStatus: LoadingStatus,
}

const initialState : iAnalyticsDataState = {
    analyticsData: [],
    loadingStatus: 'idle',
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

export const sortedDataSelector = createSelector(
    (state : RootState) => state.analyticsData, 
    (analyticsData: iAnalyticsDataState)  => {
        const sortedData = [...analyticsData.analyticsData].sort((a, b) => {
            return a.timestamp > b.timestamp? 1 : -1;
        })
        return sortedData;
    }
)

export const loadAnalyticsData = createAction('analytics/loadAnalyticsData');

export const { setAnalyticsDataRecieved, setAnalyticsDataLoading, setAnalyticsDataError } = analyticsDataSlice.actions;

const { reducer } = analyticsDataSlice;

export default reducer;
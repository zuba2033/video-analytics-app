import { createSlice, createAction, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type LoadingStatus = 'idle' | 'loading' | 'error';

export interface iAnalyticsData {
    id: number,
    timestamp: number,
    duration: number,
    zone: {
        left: number,
        top: number,
        width: number,
        height: number
    }
}

interface iAnalyticsDataState {
    analyticsData: iAnalyticsData[],
    loadingStatus: LoadingStatus,
    startTime: number
}

const initialState : iAnalyticsDataState = {
    analyticsData: [],
    loadingStatus: 'idle',
    startTime: 0
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
        },
        setStartTime(state, action: PayloadAction<number>) {
            state.startTime = action.payload
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

export const { 
    setAnalyticsDataRecieved, 
    setAnalyticsDataLoading, 
    setAnalyticsDataError, 
    setStartTime 
} = analyticsDataSlice.actions;

const { reducer } = analyticsDataSlice;

export default reducer;
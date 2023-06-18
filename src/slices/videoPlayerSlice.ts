import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface iVideoPlayerState {
    startTime: number,
    currentTime: number
}

const initialState : iVideoPlayerState = {
    startTime: 0,
    currentTime: 0,
};

const videoPlayerSlice = createSlice({
    name: 'videoPlayer',
    initialState,
    reducers: {
        setStartTime(state, action: PayloadAction<number>) {
            state.startTime = action.payload
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload
        }
  },    
});

export const { setStartTime, setCurrentTime } = videoPlayerSlice.actions;

const { reducer } = videoPlayerSlice;

export default reducer;




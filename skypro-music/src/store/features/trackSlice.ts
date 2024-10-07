import { TrackType } from "@/TrackType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateTrackType = {
  tracks: TrackType[],
  thisTrack: TrackType | null;
};

const initialState: initialStateTrackType = {
  tracks: [],
  thisTrack: null
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<TrackType[]>) => {
      state.tracks = action.payload;
    },
    setThisTrack: (state, action: PayloadAction<TrackType>) => {
      state.thisTrack = action.payload
    }
  },
});

export const { setTrackState, setThisTrack } = trackSlice.actions;
export const TrackReducer = trackSlice.reducer;

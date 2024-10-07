import { TrackType } from "@/TrackType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateTrackType = {
  tracks: TrackType[],
  thisTrack: TrackType | null,
  defaultTrack: TrackType[],
  isShuffle: boolean,
};

const initialState: initialStateTrackType = {
  tracks: [],
  thisTrack: null,
  defaultTrack: [],
  isShuffle: false,
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<TrackType[]>) => {
      state.tracks = action.payload;
      state.defaultTrack = action.payload;
    },
    setThisTrack: (state, action: PayloadAction<TrackType>) => {
      state.thisTrack = action.payload
    },
    setNextTrack: (state) => {
      const playlist = !state.isShuffle ? state.tracks : state.defaultTrack
      const index = playlist.findIndex(item => item._id === state.thisTrack!._id)
      state.thisTrack = playlist[index + 1] 
    },
    setPrevTrack: (state) => {
      const playlist = !state.isShuffle ? state.tracks : state.defaultTrack
      const index = playlist.findIndex(item => item._id === state.thisTrack!._id)
      state.thisTrack = playlist[index - 1] 
    },
    setShuffleTrack: (state) => {
      state.defaultTrack.sort(() => Math.random() - 0.5)
    },
    setIsShuffleTrack: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload
    }
  },
});

export const { setTrackState, setThisTrack, setNextTrack, setPrevTrack, setShuffleTrack, setIsShuffleTrack } = trackSlice.actions;
export const TrackReducer = trackSlice.reducer;

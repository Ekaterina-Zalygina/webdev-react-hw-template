import { TrackType } from "@/TrackType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateTrackType = {
  tracks: TrackType[],
  thisTrack: TrackType | null,
  shuffleTrack: TrackType[],
  isShuffle: boolean,
};

const initialState: initialStateTrackType = {
  tracks: [],
  thisTrack: null,
  shuffleTrack: [],
  isShuffle: false,
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<TrackType[]>) => {
      state.tracks = action.payload;
      state.shuffleTrack = action.payload;
    },
    setThisTrack: (state, action: PayloadAction<{currentTrack: TrackType; currentPlaylist: TrackType[]}>) => {
      state.thisTrack = action.payload.currentTrack
      state.tracks = action.payload.currentPlaylist
      state.shuffleTrack = [...action.payload.currentPlaylist].sort(() => 0.5 - Math.random())
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffleTrack : state.tracks 
      const index = playlist.findIndex(item => item._id === state.thisTrack?._id)
      const nextIndex = index + 1

      console.log(nextIndex)
      console.log("SLICE THIS TRACK", state.thisTrack)

      if(nextIndex >= playlist.length) {
        state.thisTrack = playlist[0]
      } else {
        state.thisTrack = playlist[nextIndex]
      }
    },
    setPrevTrack: (state) => {
      console.log("PREV")
      const playlist = !state.isShuffle ? state.tracks : state.shuffleTrack
      const index = playlist.findIndex(item => item._id === state.thisTrack!._id)
      const prevIndex = index - 1
      if(prevIndex === 0) {
        state.thisTrack = playlist[0]
      } else {
        state.thisTrack = playlist[prevIndex]
      }
    },
    setShuffleTrack: (state) => {
      state.shuffleTrack.sort(() => Math.random() - 0.5)
    },
    setIsShuffleTrack: (state) => {
      state.isShuffle = !state.isShuffle
    }
  },
});

export const { setTrackState, setThisTrack, setNextTrack, setPrevTrack, setShuffleTrack, setIsShuffleTrack } = trackSlice.actions;
export const TrackReducer = trackSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    availableBackgroundArr: [],
    currentBackground: null,
  },
  reducers: {
    changeBackgroundHandler(state, action) {
      if (state.currentBackground.id !== action.payload.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === action.payload.id);
        state.currentBackground = newBackground;
      }
    },
    changeBackgroundTimeHandler(state, action) {
      let backgroundID = state.currentBackground.id;
      backgroundID = backgroundID.slice(0, 2) + action.payload + backgroundID.slice(3);
      if (backgroundID !== state.currentBackground.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === backgroundID);
        state.currentBackground = newBackground;
      }
    },
    changeBackgroundWeatherHandler(state, action) {
      let backgroundID = state.currentBackground.id;
      backgroundID = backgroundID.slice(0, 3) + action.payload;
      if (backgroundID !== state.currentBackground.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === backgroundID);
        state.currentBackground = newBackground;
      }
    },
    setAvailableBackground(state, action) {
      state.availableBackgroundArr = action.payload;
      state.currentBackground = action.payload[0];
    },
  },
});

export const backgroundActions = backgroundSlice.actions;
export default backgroundSlice.reducer;

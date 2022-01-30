import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    availableBackgroundArr: [],
    currentBackground: null,
  },
  reducers: {
    changeBackgroundHandler(state, action) {
      if (state.currentBackground.id !== action.payload) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === action.payload);
        state.currentBackground = newBackground;
      }
    },
    changeBackgroundTimeHandler(state, action) {
      let backgroundId = state.currentBackground.id;
      backgroundId = backgroundId.slice(0, 2) + action.payload + backgroundId.slice(3);
      if (backgroundId !== state.currentBackground.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === backgroundId);
        state.currentBackground = newBackground;
      }
    },
    changeBackgroundWeatherHandler(state, action) {
      let backgroundId = state.currentBackground.id;
      backgroundId = backgroundId.slice(0, 3) + action.payload;
      if (backgroundId !== state.currentBackground.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === backgroundId);
        state.currentBackground = newBackground;
      }
    },
    setAvailableBackground(state, action) {
      state.availableBackgroundArr = action.payload;
      state.currentBackground = action.payload.find((background) => background.id === '0411');
    },
  },
});

export const backgroundActions = backgroundSlice.actions;
export default backgroundSlice.reducer;

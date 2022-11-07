import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    availableBackgroundArr: [],
    availableBackgroundCategoryArr: [],
    currentBackground: null,
    backgroundNotCustomizable: false,
  },
  reducers: {
    changeBackgroundHandler(state, action) {
      if (state.currentBackground.id !== action.payload) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === action.payload);

        if (newBackground) {
          state.currentBackground = newBackground;
        }
      }
    },
    changeBackgroundTimeHandler(state, action) {
      let backgroundId = state.currentBackground.id;
      backgroundId = backgroundId.slice(0, -2) + action.payload + backgroundId.slice(-1);
      if (backgroundId !== state.currentBackground.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === backgroundId);
        state.currentBackground = newBackground;
      }
    },
    changeBackgroundWeatherHandler(state, action) {
      let backgroundId = state.currentBackground.id;
      backgroundId = backgroundId.slice(0, -1) + action.payload;
      if (backgroundId !== state.currentBackground.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === backgroundId);
        state.currentBackground = newBackground;
      }
    },
    setAvailableBackground(state, action) {
      state.availableBackgroundArr = action.payload;
      state.currentBackground = action.payload.find((background) => background.id === 'Seasonal_BG0111');
    },
    setAvailableBackgroundCategory(state, action) {
      state.availableBackgroundCategoryArr = action.payload;
    },
    setBackgroundNotCustomizable(state, action) {
      state.backgroundNotCustomizable = action.payload;
    },
  },
});

export const backgroundActions = backgroundSlice.actions;
export default backgroundSlice.reducer;

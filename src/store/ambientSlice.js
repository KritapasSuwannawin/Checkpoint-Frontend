import { createSlice } from '@reduxjs/toolkit';

const ambientSlice = createSlice({
  name: 'ambient',
  initialState: {
    availableAmbientArr: [
      {
        id: '1',
        name: 'rainy',
        filePath: 'ambient/Ambient_test_rain.mp3',
        thumbnailFilePath: 'ambient/ambient rainy thumbnail.jpg',
      },
      {
        id: '2',
        name: 'river',
        filePath: 'ambient/Ambient_test_river.mp3',
        thumbnailFilePath: 'ambient/ambient river thumbnail.jpg',
      },
      {
        id: '3',
        name: 'wind',
        filePath: 'ambient/Ambient_test_Wind.mp3',
        thumbnailFilePath: 'ambient/ambient Wind thumbnail.jpg',
      },
      {
        id: '4',
        name: 'night forest',
        filePath: 'ambient/Ambient_test_Night_Forest.mp3',
        thumbnailFilePath: 'ambient/ambient Night Forest thumbnail.jpg',
      },
    ],
    currentAmbientArr: [],
    ambientVolume: 0.5,
  },
  reducers: {
    ambientToggleHandler(state, action) {
      if (state.currentAmbientArr.findIndex((ambient) => ambient.id === action.payload.id) >= 0) {
        state.currentAmbientArr = state.currentAmbientArr.filter((ambient) => ambient.id !== action.payload.id);
      } else {
        state.currentAmbientArr = [...state.currentAmbientArr, action.payload];
      }
    },
    setAmbientVolume(state, action) {
      state.ambientVolume = action.payload;
    },
    setAvailableAmbient(state, action) {
      const availableAmbientArr = [...state.availableAmbientArr];
      const existingAmbientIndex = availableAmbientArr.findIndex((ambient) => ambient.id === action.payload.id);
      if (availableAmbientArr[existingAmbientIndex].url) {
        return;
      }
      availableAmbientArr[existingAmbientIndex] = action.payload;
      state.availableAmbientArr = availableAmbientArr;
    },
  },
});

export const ambientActions = ambientSlice.actions;
export default ambientSlice.reducer;

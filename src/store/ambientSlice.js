import { createSlice } from '@reduxjs/toolkit';

const ambientSlice = createSlice({
  name: 'ambient',
  initialState: {
    availableAmbientArr: [
      {
        id: '1',
        name: 'rainy',
        filePath: 'ambient/audio/Ambient_test_rain.mp3',
        thumbnailFilePath: 'ambient/thumbnail/ambient rainy thumbnail.jpg',
      },
      {
        id: '2',
        name: 'river',
        filePath: 'ambient/audio/Ambient_test_river.mp3',
        thumbnailFilePath: 'ambient/thumbnail/ambient river thumbnail.jpg',
      },
      {
        id: '3',
        name: 'wind',
        filePath: 'ambient/audio/Ambient_test_Wind.mp3',
        thumbnailFilePath: 'ambient/thumbnail/ambient Wind thumbnail.jpg',
      },
      {
        id: '4',
        name: 'night forest',
        filePath: 'ambient/audio/Ambient_test_Night_Forest.mp3',
        thumbnailFilePath: 'ambient/thumbnail/ambient Night Forest thumbnail.jpg',
      },
      {
        id: '5',
        name: 'train',
        filePath: 'ambient/audio/Ambient_test_Train.mp3',
        thumbnailFilePath: 'ambient/thumbnail/ambient train thumbnail.jpg',
      },
      {
        id: '6',
        name: 'fireplace',
        filePath: 'ambient/audio/Fireplace.mp3',
        thumbnailFilePath: 'ambient/thumbnail/Fireplace.jpg',
      },
      {
        id: '7',
        name: 'winter storm',
        filePath: 'ambient/audio/Winter Storm.mp3',
        thumbnailFilePath: 'ambient/thumbnail/Winter Storm.jpg',
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
      if (availableAmbientArr[existingAmbientIndex].url && availableAmbientArr[existingAmbientIndex].thumbnailUrl) {
        return;
      }
      availableAmbientArr[existingAmbientIndex] = action.payload;
      state.availableAmbientArr = availableAmbientArr;
    },
    setCurrentAmbientArrByIDArr(state, action) {
      const currentAmbientArr = [];
      action.payload.forEach((ambientID) => {
        const ambient = state.availableAmbientArr.find((ambient) => ambient.id === ambientID);
        currentAmbientArr.push(ambient);
      });
      state.currentAmbientArr = currentAmbientArr;
    },
  },
});

export const ambientActions = ambientSlice.actions;
export default ambientSlice.reducer;

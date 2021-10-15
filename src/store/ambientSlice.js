import { createSlice } from '@reduxjs/toolkit';

const ambientSlice = createSlice({
  name: 'ambient',
  initialState: {
    availableAmbientArr: [
      {
        id: '1',
        name: 'Light Rain',
        filePath: 'ambient/audio/Light_Rain.m4a',
        thumbnailFilePath: 'ambient/thumbnail/TAB_Light_Rain.jpg',
        volume: 0.15,
      },
      {
        id: '2',
        name: 'Heavy Rain',
        filePath: 'ambient/audio/Heavy_Rain.m4a',
        thumbnailFilePath: 'ambient/thumbnail/TAB_Heavy_Rain.jpg',
        volume: 0.25,
      },
      {
        id: '3',
        name: 'Thunder Storm',
        filePath: 'ambient/audio/Thunder_Strom.m4a',
        thumbnailFilePath: 'ambient/thumbnail/TAB_Thunder_Strom.jpg',
        volume: 0.8,
      },
      {
        id: '4',
        name: 'Wind tree',
        filePath: 'ambient/audio/Wind_Tree.m4a',
        thumbnailFilePath: 'ambient/thumbnail/TAB_Wind_Tree.jpg',
        volume: 0.15,
      },
      {
        id: '5',
        name: 'River',
        filePath: 'ambient/audio/River.m4a',
        thumbnailFilePath: 'ambient/thumbnail/TAB_River.jpg',
        volume: 0.25,
      },
      {
        id: '6',
        name: 'Bird Park',
        filePath: 'ambient/audio/Bird_Park.m4a',
        thumbnailFilePath: 'ambient/thumbnail/TAB_Bird_Park.jpg',
        volume: 0.15,
      },
      {
        id: '7',
        name: 'Bird Forest',
        filePath: 'ambient/audio/Bird_Forest.m4a',
        thumbnailFilePath: 'ambient/thumbnail/TAB_Bird_Forest.jpg',
        volume: 0.15,
      },
      {
        id: '8',
        name: 'Night Forest',
        filePath: 'ambient/audio/Night_Forest.m4a',
        thumbnailFilePath: 'ambient/thumbnail/TAB_Night_Forest.jpg',
        volume: 0.15,
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
        const newAmbient = state.availableAmbientArr.find((ambient) => ambient.id === action.payload.id);
        state.currentAmbientArr = [...state.currentAmbientArr, newAmbient];
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
    setSpecificAmbientVolume(state, action) {
      const availableAmbientArr = [...state.availableAmbientArr];
      const existingAmbientIndex = availableAmbientArr.findIndex((ambient) => ambient.id === action.payload.id);
      availableAmbientArr[existingAmbientIndex].volume = action.payload.volume;
      state.availableAmbientArr = availableAmbientArr;

      const currentAmbientArr = [...state.currentAmbientArr];
      const existingCurrentAmbientIndex = currentAmbientArr.findIndex((ambient) => ambient.id === action.payload.id);
      if (existingCurrentAmbientIndex >= 0) {
        currentAmbientArr[existingCurrentAmbientIndex].volume = action.payload.volume;
        state.currentAmbientArr = currentAmbientArr;
      }
    },
  },
});

export const ambientActions = ambientSlice.actions;
export default ambientSlice.reducer;

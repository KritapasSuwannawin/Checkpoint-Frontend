import { createSlice } from '@reduxjs/toolkit';

const ambientSlice = createSlice({
  name: 'ambient',
  initialState: {
    availableAmbientArr: [],
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
    setAvailableAmbient(state, action) {
      state.availableAmbientArr = action.payload;
    },
  },
});

export const ambientActions = ambientSlice.actions;
export default ambientSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const ambientSlice = createSlice({
  name: 'ambient',
  initialState: {
    availableAmbientArr: [],
    currentAmbientArr: [],
    ambientVolume: 0.5,
    count: 0,
  },
  reducers: {
    ambientToggleHandler(state, action) {
      if (state.currentAmbientArr.findIndex((ambient) => ambient.id === action.payload) >= 0) {
        state.currentAmbientArr = state.currentAmbientArr.filter((ambient) => ambient.id !== action.payload);
      } else {
        const newAmbient = state.availableAmbientArr.find((ambient) => ambient.id === action.payload);
        state.currentAmbientArr = [...state.currentAmbientArr, newAmbient];
      }
    },
    setAmbientVolume(state, action) {
      state.ambientVolume = action.payload;
    },
    setCurrentAmbientArrByIdArr(state, action) {
      const currentAmbientArr = [];
      action.payload.forEach((ambientId) => {
        const ambient = state.availableAmbientArr.find((ambient) => ambient.id === ambientId);
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
      state.count = action.payload.length;
    },
  },
});

export const ambientActions = ambientSlice.actions;
export default ambientSlice.reducer;

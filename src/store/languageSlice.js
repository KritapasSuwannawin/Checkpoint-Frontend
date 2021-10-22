import { createSlice } from '@reduxjs/toolkit';

const languageSlide = createSlice({
  name: 'language',
  initialState: { languageIndex: 0 },
  reducers: {
    languageChangeHandler(state, action) {
      if (state.languageIndex === 0) {
        state.languageIndex = 1;
      } else {
        state.languageIndex = 0;
      }
    },
  },
});

export const languageActions = languageSlide.actions;
export default languageSlide.reducer;

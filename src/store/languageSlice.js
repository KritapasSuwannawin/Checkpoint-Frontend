import { createSlice } from '@reduxjs/toolkit';

const languageSlide = createSlice({
  name: 'language',
  initialState: { isJapanese: false },
  reducers: {
    languageChangeHandler(state, action) {
      state.isJapanese = !state.isJapanese;
    },
  },
});

export const languageActions = languageSlide.actions;
export default languageSlide.reducer;

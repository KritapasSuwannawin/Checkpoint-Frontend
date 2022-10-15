import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    showLoginPopup: false,
    showHelpSupportPopup: false,
    showCookiePopup: false,
    showFiveMinuteFeedbackPopup: false,
    showFeedbackPopup: false,
    showSafariGuidePopup: false,
    showTutorialPopup: false,
    showTimerPopup: false,
    showOutsideLinkPopup: false,
  },
  reducers: {
    setShowLoginPopup(state, action) {
      state.showLoginPopup = action.payload;
    },
    setShowHelpSupportPopup(state, action) {
      state.showHelpSupportPopup = action.payload;
    },
    setShowCookiePopup(state, action) {
      state.showCookiePopup = action.payload;
    },
    setShowFiveMinuteFeedbackPopup(state, action) {
      state.showFiveMinuteFeedbackPopup = action.payload;
    },
    setShowFeedbackPopup(state, action) {
      state.showFeedbackPopup = action.payload;
    },
    setShowSafariGuidePopup(state, action) {
      state.showSafariGuidePopup = action.payload;
    },
    setShowTutorialPopup(state, action) {
      state.showTutorialPopup = action.payload;
    },
    setShowTimerPopup(state, action) {
      state.showTimerPopup = action.payload;
    },
    setShowOutsideLinkPopup(state, action) {
      state.showOutsideLinkPopup = action.payload;
    },
    toggleShowTimerPopup(state, action) {
      state.showTimerPopup = !state.showTimerPopup;
    },
    toggleShowOutsideLinkPopup(state, action) {
      state.showOutsideLinkPopup = !state.showOutsideLinkPopup;
    },
  },
});

export const popupActions = popupSlice.actions;
export default popupSlice.reducer;

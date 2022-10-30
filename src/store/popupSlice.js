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
    showProfilePopupPopup: false,
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
    setShowProfilePopupPopup(state, action) {
      state.showProfilePopupPopup = action.payload;
    },
    toggleShowTimerPopup(state, action) {
      state.showTimerPopup = !state.showTimerPopup;
    },
    toggleShowProfilePopupPopup(state, action) {
      state.showProfilePopupPopup = !state.showProfilePopupPopup;
    },
  },
});

export const popupActions = popupSlice.actions;
export default popupSlice.reducer;

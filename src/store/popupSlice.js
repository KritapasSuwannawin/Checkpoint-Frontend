import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    showLoginPopup: false,
    showUpgradePopup: false,
    showFreeTrialPopup: false,
    showLastDayTrialPopup: false,
    showExpirationPopup: false,
    showActivationPopup: false,
    showHelpSupportPopup: false,
    showSubscriptionPopup: false,
    showCookiePopup: false,
    showFiveMinuteFeedbackPopup: false,
    showAfterTrialStandardFeedbackPopup: false,
    showTrialLastDayFeedbackPopup: false,
    showAfterTrialPremiumFeedbackPopup: false,
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
    setShowUpgradePopup(state, action) {
      state.showUpgradePopup = action.payload;
    },
    setShowFreeTrialPopup(state, action) {
      state.showFreeTrialPopup = action.payload;
    },
    setShowLastDayTrialPopup(state, action) {
      state.showLastDayTrialPopup = action.payload;
    },
    setShowExpirationPopup(state, action) {
      state.showExpirationPopup = action.payload;
    },
    setShowActivationPopup(state, action) {
      state.showActivationPopup = action.payload;
    },
    setShowHelpSupportPopup(state, action) {
      state.showHelpSupportPopup = action.payload;
    },
    setShowSubscriptionPopup(state, action) {
      state.showSubscriptionPopup = action.payload;
    },
    setShowCookiePopup(state, action) {
      state.showCookiePopup = action.payload;
    },
    setShowFiveMinuteFeedbackPopup(state, action) {
      state.showFiveMinuteFeedbackPopup = action.payload;
    },
    setShowAfterTrialStandardFeedbackPopup(state, action) {
      state.showAfterTrialStandardFeedbackPopup = action.payload;
    },
    setShowTrialLastDayFeedbackPopup(state, action) {
      state.showTrialLastDayFeedbackPopup = action.payload;
    },
    setShowAfterTrialPremiumFeedbackPopup(state, action) {
      state.showAfterTrialPremiumFeedbackPopup = action.payload;
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

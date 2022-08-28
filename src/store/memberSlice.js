import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    memberId: undefined,
    username: undefined,
    registrationDate: undefined,
    premiumExpirationDate: undefined,
    trialStartDate: undefined,
    isPremium: undefined,
    isOntrial: undefined,
    dayOfTrial: undefined,
  },
  reducers: {
    setMember(state, action) {
      const { id, username, registrationDate, premiumExpirationDate, trialStartDate } = action.payload;

      state.memberId = id;
      state.username = username;
      state.registrationDate = registrationDate;
      state.premiumExpirationDate = premiumExpirationDate;
      state.trialStartDate = trialStartDate;

      const premiumExpirationTime = new Date(premiumExpirationDate).getTime();
      const currentTime = new Date().getTime();

      const isPremium = Math.floor((premiumExpirationTime - currentTime) / (1000 * 60 * 60 * 24)) > 0;
      const trialStartTime = new Date(trialStartDate ? trialStartDate : registrationDate).getTime();

      state.isPremium = isPremium;

      if (isPremium && Math.floor((premiumExpirationTime - trialStartTime) / (1000 * 60 * 60 * 24)) === 7) {
        state.isOntrial = true;
        state.dayOfTrial = Math.floor((currentTime - trialStartTime) / (1000 * 60 * 60 * 24)) + 1;
      } else {
        state.isOntrial = false;
      }
    },
    upgradeMember(state, action) {
      state.premiumExpirationDate = action.payload.premiumExpirationDate;
      state.isPremium = true;
      state.isOntrial = false;
      state.dayOfTrial = undefined;
    },
    logout(state, action) {
      state.memberId = undefined;
      state.username = undefined;
      state.registrationDate = undefined;
      state.premiumExpirationDate = undefined;
      state.trialStartDate = undefined;
      state.isPremium = undefined;
      state.isOntrial = undefined;
      state.dayOfTrial = undefined;
    },
    startFreeTrial(state, action) {
      const { premiumExpirationDate, trialStartDate } = action.payload;
      state.premiumExpirationDate = premiumExpirationDate;
      state.trialStartDate = trialStartDate;
      state.isPremium = true;
      state.isOntrial = true;
      state.dayOfTrial = 1;
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;

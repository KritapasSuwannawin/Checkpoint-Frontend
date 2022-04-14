import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    memberId: undefined,
    username: undefined,
    isPremium: undefined,
    registrationDate: undefined,
    premiumExpirationDate: undefined,
    isOntrial: undefined,
    dayOfTrial: undefined,
  },
  reducers: {
    setMember(state, action) {
      state.memberId = action.payload.id;
      state.username = action.payload.username;

      const { registrationDate, premiumExpirationDate, isPremium } = action.payload;

      state.isPremium = isPremium;
      state.registrationDate = registrationDate;
      state.premiumExpirationDate = premiumExpirationDate;

      const registrationTime = new Date(registrationDate).getTime();
      const premiumExpirationTime = new Date(premiumExpirationDate).getTime();
      const dateDifference = Math.floor((premiumExpirationTime - registrationTime) / (1000 * 60 * 60 * 24));

      if (isPremium && dateDifference === 7) {
        const currentTime = new Date().getTime();
        const dateDifference = Math.floor((currentTime - registrationTime) / (1000 * 60 * 60 * 24));

        state.isOntrial = true;
        state.dayOfTrial = dateDifference + 1;
      } else {
        state.isOntrial = false;
      }
    },
    upgradeMember(state, action) {
      state.isPremium = true;
      state.isOntrial = false;
      state.dayOfTrial = undefined;
      state.premiumExpirationDate = action.payload.premiumExpirationDate;
    },
    logout(state, action) {
      state.memberId = undefined;
      state.username = undefined;
      state.isPremium = undefined;
      state.registrationDate = undefined;
      state.premiumExpirationDate = undefined;
      state.isOntrial = undefined;
      state.dayOfTrial = undefined;
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;

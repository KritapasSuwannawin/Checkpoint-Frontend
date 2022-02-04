import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: { memberId: undefined, username: undefined, isPremium: undefined },
  reducers: {
    setMember(state, action) {
      state.memberId = action.payload.id;
      state.username = action.payload.username;
      state.isPremium = action.payload.isPremium;
    },
    upgradeMember(state, action) {
      state.isPremium = true;
    },
    logout(state, action) {
      state.memberId = undefined;
      state.username = undefined;
      state.isPremium = undefined;
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;

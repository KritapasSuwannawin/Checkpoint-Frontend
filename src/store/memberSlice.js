import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: { memberId: undefined, username: undefined, memberType: undefined },
  reducers: {
    setMember(state, action) {
      state.memberId = action.payload.id;
      state.username = action.payload.username;
      state.memberType = action.payload.memberType;
    },
    upgradeMember(state, action) {
      state.memberType = 'premium';
    },
    logout(state, action) {
      state.memberId = undefined;
      state.username = undefined;
      state.memberType = undefined;
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;

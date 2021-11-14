import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: { memberId: undefined, username: undefined, memberType: undefined, avatarId: undefined },
  reducers: {
    setMember(state, action) {
      state.memberId = action.payload.id;
      state.username = action.payload.username;
      state.memberType = action.payload.memberType;
      state.avatarId = action.payload.avatarId;
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    memberId: undefined,
    username: undefined,
  },
  reducers: {
    setMember(state, action) {
      const { id, username } = action.payload;
      state.memberId = id;
      state.username = username;
    },
    logout(state, action) {
      state.memberId = undefined;
      state.username = undefined;
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;

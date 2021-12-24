import { createSlice } from '@reduxjs/toolkit';

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: {
    availableAvatarArr: [],
    currentAvatar: null,
  },
  reducers: {
    setAvailableAvatar(state, action) {
      state.availableAvatarArr = action.payload;
      state.currentAvatar = action.payload[0];
    },
    changeAvatarHandler(state, action) {
      if (state.currentAvatar.id !== action.payload.id) {
        const newAvatar = state.availableAvatarArr.find((avatar) => avatar.id === action.payload.id);
        state.currentAvatar = newAvatar;
      }
    },
  },
});

export const avatarActions = avatarSlice.actions;
export default avatarSlice.reducer;

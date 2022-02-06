import { createSlice } from '@reduxjs/toolkit';

const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    deviceId: undefined,
    startTime: undefined,
  },
  reducers: {
    setNewDevice(state, action) {
      state.deviceId = `${Math.random()}`;
      state.startTime = Date.now();
    },
  },
});

export const deviceActions = deviceSlice.actions;
export default deviceSlice.reducer;

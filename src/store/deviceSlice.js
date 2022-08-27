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
    clearDevice(state, action) {
      state.deviceId = undefined;
      state.startTime = undefined;
    },
  },
});

export const deviceActions = deviceSlice.actions;
export default deviceSlice.reducer;

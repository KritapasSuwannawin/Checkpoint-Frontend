import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    availableBackgroundArr: [
      { id: '1', filePath: 'background/bg1.mp4', thumbnailFilePath: 'background/bg1 thumbnail.png' },
      { id: '2', filePath: 'background/bg2.mp4', thumbnailFilePath: 'background/bg2 thumbnail.jpg' },
    ],
    currentBackground: { id: '1', filePath: 'background/bg1.mp4', thumbnailFilePath: 'background/bg1 thumbnail.png' },
  },
  reducers: {
    changeBackgroundHandler(state, action) {
      if (state.currentBackground.id !== action.payload.id) {
        state.currentBackground = action.payload;
      }
    },
  },
});

export const backgroundActions = backgroundSlice.actions;
export default backgroundSlice.reducer;

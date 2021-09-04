import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    availableBackgroundArr: [
      { id: '2', filePath: 'background/video/BG0211.mp4', thumbnailFilePath: 'background/thumbnail/TBG0211.jpg' },
      { id: '1', filePath: 'background/video/BG0111.mp4', thumbnailFilePath: 'background/thumbnail/TBG0111.jpg' },
      { id: '3', filePath: 'background/video/BG0311.mp4', thumbnailFilePath: 'background/thumbnail/TBG0311.jpg' },
      { id: '4', filePath: 'background/video/BG0411.mp4', thumbnailFilePath: 'background/thumbnail/TBG0411.jpg' },
      { id: '5', filePath: 'background/video/BG0511.mp4', thumbnailFilePath: 'background/thumbnail/TBG0511.jpg' },
      { id: '6', filePath: 'background/video/BG0611.mp4', thumbnailFilePath: 'background/thumbnail/TBG0611.jpg' },
      { id: '7', filePath: 'background/video/BG0711.mp4', thumbnailFilePath: 'background/thumbnail/TBG0711.jpg' },
    ],
    currentBackground: {
      id: '2',
      filePath: 'background/video/BG0211.mp4',
      thumbnailFilePath: 'background/thumbnail/TBG0211.jpg',
    },
  },
  reducers: {
    changeBackgroundHandler(state, action) {
      if (state.currentBackground.id !== action.payload.id) {
        state.currentBackground = action.payload;
      }
    },
    setAvailableBackground(state, action) {
      const availableBackgroundArr = [...state.availableBackgroundArr];
      const existingBackgroundIndex = availableBackgroundArr.findIndex(
        (background) => background.id === action.payload.id
      );
      if (availableBackgroundArr[existingBackgroundIndex].url) {
        return;
      }
      availableBackgroundArr[existingBackgroundIndex] = action.payload;
      state.availableBackgroundArr = availableBackgroundArr;
    },
  },
});

export const backgroundActions = backgroundSlice.actions;
export default backgroundSlice.reducer;

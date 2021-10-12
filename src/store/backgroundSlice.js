import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    availableBackgroundArr: [
      {
        id: '0111',
        filePath: 'background/video/BG0111_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0111.jpg',
        ambientArr: [],
      },
      {
        id: '0112',
        filePath: 'background/video/BG0112_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0112.jpg',
        ambientArr: [],
      },
      {
        id: '0113',
        filePath: 'background/video/BG0113_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0113.jpg',
        ambientArr: [],
      },
      {
        id: '0114',
        filePath: 'background/video/BG0114_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0114.jpg',
        ambientArr: [],
      },
      {
        id: '0121',
        filePath: 'background/video/BG0121_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0121.jpg',
        ambientArr: [],
      },
      {
        id: '0122',
        filePath: 'background/video/BG0122_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0122.jpg',
        ambientArr: [],
      },
      {
        id: '0123',
        filePath: 'background/video/BG0123_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0123.jpg',
        ambientArr: [],
      },
      {
        id: '0124',
        filePath: 'background/video/BG0124_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0124.jpg',
        ambientArr: [],
      },
      {
        id: '0131',
        filePath: 'background/video/BG0131_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0131.jpg',
        ambientArr: [],
      },
      {
        id: '0132',
        filePath: 'background/video/BG0132_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0132.jpg',
        ambientArr: [],
      },
      {
        id: '0133',
        filePath: 'background/video/BG0133_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0133.jpg',
        ambientArr: [],
      },
      {
        id: '0134',
        filePath: 'background/video/BG0134_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0134.jpg',
        ambientArr: [],
      },
      {
        id: '0211',
        filePath: 'background/video/BG0211_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0211.jpg',
        ambientArr: [],
      },
      {
        id: '0212',
        filePath: 'background/video/BG0212_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0212.jpg',
        ambientArr: [],
      },
      {
        id: '0213',
        filePath: 'background/video/BG0213_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0213.jpg',
        ambientArr: [],
      },
      {
        id: '0214',
        filePath: 'background/video/BG0214_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0214.jpg',
        ambientArr: [],
      },
      {
        id: '0221',
        filePath: 'background/video/BG0221_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0221.jpg',
        ambientArr: [],
      },
      {
        id: '0222',
        filePath: 'background/video/BG0222_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0222.jpg',
        ambientArr: [],
      },
      {
        id: '0223',
        filePath: 'background/video/BG0223_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0223.jpg',
        ambientArr: [],
      },
      {
        id: '0224',
        filePath: 'background/video/BG0224_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0224.jpg',
        ambientArr: [],
      },
      {
        id: '0231',
        filePath: 'background/video/BG0231_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0231.jpg',
        ambientArr: [],
      },
      {
        id: '0232',
        filePath: 'background/video/BG0232_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0232.jpg',
        ambientArr: [],
      },
      {
        id: '0233',
        filePath: 'background/video/BG0233_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0233.jpg',
        ambientArr: [],
      },
      {
        id: '0234',
        filePath: 'background/video/BG0234_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0234.jpg',
        ambientArr: [],
      },
      {
        id: '0311',
        filePath: 'background/video/BG0311_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0311.jpg',
        ambientArr: [],
      },
      {
        id: '0312',
        filePath: 'background/video/BG0312_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0312.jpg',
        ambientArr: [],
      },
      {
        id: '0313',
        filePath: 'background/video/BG0313_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0313.jpg',
        ambientArr: [],
      },
      {
        id: '0314',
        filePath: 'background/video/BG0314_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0314.jpg',
        ambientArr: [],
      },
      {
        id: '0321',
        filePath: 'background/video/BG0321_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0321.jpg',
        ambientArr: [],
      },
      {
        id: '0322',
        filePath: 'background/video/BG0322_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0322.jpg',
        ambientArr: [],
      },
      {
        id: '0323',
        filePath: 'background/video/BG0323_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0323.jpg',
        ambientArr: [],
      },
      {
        id: '0324',
        filePath: 'background/video/BG0324_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0324.jpg',
        ambientArr: [],
      },
      {
        id: '0331',
        filePath: 'background/video/BG0331_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0331.jpg',
        ambientArr: [],
      },
      {
        id: '0332',
        filePath: 'background/video/BG0332_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0332.jpg',
        ambientArr: [],
      },
      {
        id: '0333',
        filePath: 'background/video/BG0333_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0333.jpg',
        ambientArr: [],
      },
      {
        id: '0334',
        filePath: 'background/video/BG0334_1080p.mp4',
        thumbnailFilePath: 'background/thumbnail/TBG0334.jpg',
        ambientArr: [],
      },
    ],
    currentBackground: {
      id: '0111',
      filePath: 'background/video/BG0111_1080p.mp4',
      thumbnailFilePath: 'background/thumbnail/TBG0111.jpg',
      ambientArr: [],
    },
  },
  reducers: {
    changeBackgroundHandler(state, action) {
      if (state.currentBackground.id !== action.payload.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === action.payload.id);
        state.currentBackground = newBackground;
      }
    },
    setAvailableBackground(state, action) {
      const availableBackgroundArr = [...state.availableBackgroundArr];
      const existingBackgroundIndex = availableBackgroundArr.findIndex(
        (background) => background.id === action.payload.id
      );
      if (
        availableBackgroundArr[existingBackgroundIndex].url &&
        availableBackgroundArr[existingBackgroundIndex].thumbnailUrl
      ) {
        return;
      }
      availableBackgroundArr[existingBackgroundIndex] = action.payload;
      state.availableBackgroundArr = availableBackgroundArr;
    },
    changeBackgroundTimeHandler(state, action) {
      let backgroundID = state.currentBackground.id;
      backgroundID = backgroundID.slice(0, 2) + action.payload + backgroundID.slice(3);
      if (backgroundID !== state.currentBackground.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === backgroundID);
        state.currentBackground = newBackground;
      }
    },
    changeBackgroundWeatherHandler(state, action) {
      let backgroundID = state.currentBackground.id;
      backgroundID = backgroundID.slice(0, 3) + action.payload;
      if (backgroundID !== state.currentBackground.id) {
        const newBackground = state.availableBackgroundArr.find((background) => background.id === backgroundID);
        state.currentBackground = newBackground;
      }
    },
  },
});

export const backgroundActions = backgroundSlice.actions;
export default backgroundSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

import pageReducer from './pageSlice';
import backgroundReducer from './backgroundSlice';
import musicReducer from './musicSlice';
import ambientReducer from './ambientSlice';
import memberReducer from './memberSlice';
import avatarReducer from './avatarSlice';
import deviceReducer from './deviceSlice';
import popupReducer from './popupSlice';

const store = configureStore({
  reducer: {
    page: pageReducer,
    background: backgroundReducer,
    music: musicReducer,
    ambient: ambientReducer,
    member: memberReducer,
    avatar: avatarReducer,
    device: deviceReducer,
    popup: popupReducer,
  },
});

export default store;

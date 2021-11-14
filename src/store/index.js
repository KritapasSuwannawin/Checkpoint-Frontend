import { configureStore } from '@reduxjs/toolkit';

import pageReducer from './pageSlice';
import backgroundReducer from './backgroundSlice';
import musicReducer from './musicSlice';
import ambientReducer from './ambientSlice';
import languageReducer from './languageSlice';
import memberReducer from './memberSlice';

const store = configureStore({
  reducer: {
    page: pageReducer,
    background: backgroundReducer,
    music: musicReducer,
    ambient: ambientReducer,
    language: languageReducer,
    member: memberReducer,
  },
});

export default store;

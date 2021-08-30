import { configureStore } from '@reduxjs/toolkit';

import pageReducer from './pageSlice';
import backgroundReducer from './backgroundSlice';
import musicReducer from './musicSlice';
import ambientReducer from './ambientSlice';

const store = configureStore({
  reducer: { page: pageReducer, background: backgroundReducer, music: musicReducer, ambient: ambientReducer },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'page',
  initialState: { currentPage: undefined, loading: true },
  reducers: {
    changePageHandler(state, action) {
      state.currentPage = action.payload;
    },
    closePageHandler(state, action) {
      state.currentPage = undefined;
    },
    doneLoading(state, action) {
      state.loading = false;
    },
  },
});

export const pageActions = pageSlice.actions;
export default pageSlice.reducer;

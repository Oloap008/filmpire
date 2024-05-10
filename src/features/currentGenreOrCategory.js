import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreIdOrCategoryName: "",
  page: 1,
  searchQuery: "",
  isInfiniteScrolling: false,
};

const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState,
  reducers: {
    selectGenreOrCategory(state, action) {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = "";
      state.page = 1;
      state.isInfiniteScrolling = false;
    },
    searchMovie(state, action) {
      state.searchQuery = action.payload;
      state.genreIdOrCategoryName = "";
      state.page = 1;
      state.isInfiniteScrolling = false;
    },
    incrementPage(state) {
      state.page += 1;
      state.isInfiniteScrolling = true;
    },
  },
});

export const { selectGenreOrCategory, searchMovie, incrementPage } =
  genreOrCategory.actions;

export default genreOrCategory.reducer;
